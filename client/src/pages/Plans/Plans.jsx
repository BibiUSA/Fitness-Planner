import "./Plans.css";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Plans() {
  const [hideBox, setHideBox] = useState("hidden"); //class to hide add Plan Box
  const [deleteBox, setDeleteBox] = useState("hidden deleteButton"); //classes to hide deletButton
  const [newPlanInput, setNewPlanInput] = useState(""); //the input typed into a the plan name
  const [editButton, setEditButton] = useState("Edit"); //changes between edit and done to allow plan editing
  const [totalPlans, setTotalPlans] = useState([1]); //total number of plans
  const [plansAdded, setPlansAdded] = useState(0); //used to refetch full data
  const [search, setSearch] = useState(""); //search box input
  const [planWarning, setPlanWarning] = useState("hidden"); //
  const [deleteWarning, setDeleteWarning] = useState("hidden"); //
  const [warningMessage, setWarningMessage] = useState(
    //changes warning message if no plan input vs plan already exists
    "Plan already exists.Try a different name."
  );
  const [addBlue, setAddBlue] = useState("newPlanButtons gray"); //changes add button to blue when there's an input
  const [delPlan, setDelPlan] = useState();
  const [email, setEmail] = useState(null);
  function handleChange(event) {
    setNewPlanInput(event.target.value);
    if (newPlanInput.length > 1) {
      setAddBlue("newPlanButtons blue");
    } else {
      setAddBlue("newPlanButtons gray");
    }
  }

  // useEffect(() => {

  // }, []);

  //checks to see if token is there.
  const tokenLogging = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        "http://localhost:3001/account/protect",
        {},
        {
          headers: headers,
        }
      );
      console.log(response.data);
      setEmail(response.data);
      return response.data; //return value for fetchAPI

      //window.location = "/plans";
    } catch (error) {
      console.log(error);
    }
  };

  //gets all the plans
  const fetchAPI = async () => {
    const userEmail = await tokenLogging(); //checks to make sure tokenLogging is ran first fully
    if (userEmail) {
      const response = await axios.get(
        "http://localhost:3001/plans",

        {
          params: { email: userEmail },
        }
      );
      setTotalPlans(response.data.data);
      console.log(userEmail);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [plansAdded]);

  console.log(totalPlans);

  const removePlan = async () => {
    setDeleteWarning("hidden");
    try {
      const response = await axios.delete(
        `http://localhost:3001/plans/${delPlan}`
      );
      setPlansAdded(plansAdded + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const planSpread = totalPlans.map((obj) => {
    if (obj === 1) {
      return;
    } else if (obj.plan.toLowerCase().includes(search.toLowerCase())) {
      return (
        <>
          <div className="eachPlansDiv">
            <div className="eachPlansLine">
              <input
                type="button"
                value="-"
                className={deleteBox}
                onClick={() => getConfirmation(obj.plan)}
                id={obj.task_id + "d"}
              ></input>
              <Link to={`/create/${obj.plan}`} className="plansLink">
                <li id={obj.task_id} className="eachPlans">
                  {obj.plan}
                </li>
              </Link>
            </div>

            <hr className="hr"></hr>
          </div>
        </>
      );
    }
  });

  function getConfirmation(plan) {
    setDelPlan(plan);
    setDeleteWarning("confirmDelete");
  }
  //   const planExist = totalPlans.map((obj)=>{
  //     if(obj.plan === newPlanInput){
  //         return true
  //     }
  //   })
  const planExist = () => {
    for (let i = 0; i < totalPlans.length; i++) {
      if (totalPlans[i].plan === newPlanInput) {
        return true;
      }
    }
    return false;
  };

  //sends new plan data to the database
  const addPlan = async (event) => {
    if (planExist() === true) {
      setPlanWarning("planExistWarning");
      setWarningMessage("Plan already exists.Try a different name.");
      return;
    } else if (newPlanInput.length < 1) {
      setPlanWarning("planExistWarning");
      setWarningMessage("Enter a plan name.");
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:3001/plans", {
          plan: newPlanInput,
          task: "1995ActuallyAPlan", //used only for plans
        });
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
      cancel();
      setPlansAdded(plansAdded + 1);
    }
  };

  function showBox() {
    setHideBox("");
  }

  function cancel() {
    setNewPlanInput("");
    setHideBox("hidden");
    setPlanWarning("hidden");
  }

  function edit(event) {
    if (deleteBox === "hidden deleteButton") {
      setDeleteBox("deleteButton");
      setEditButton("Done");
    } else {
      setDeleteBox("hidden deleteButton");
      setEditButton("Edit");
    }
  }

  function searching(event) {
    console.log(event.target.value);
    setSearch(event.target.value);
  }

  return (
    <>
      <div className="searchSection">
        <input
          type="textarea"
          placeholder="Search"
          name="search"
          id="search"
          className="SearchBar"
          value={search}
          onChange={searching}
        ></input>
        <label htmlFor="search"></label>
      </div>
      <h1 className="planTitle">Plans</h1>
      <div id="allPlans">
        <input
          type="button"
          value={editButton}
          className="editButton"
          onClick={edit}
        ></input>
        {planSpread}
        <input
          type="button"
          id="addPlan"
          name="addPlan"
          value={"+"}
          onClick={showBox}
        ></input>

        <div id="newPlanBox" className={hideBox}>
          <div id="newPlanButtons">
            <input
              type="button"
              className="newPlanButtons"
              id="cancelNewPlan"
              value="Cancel"
              onClick={cancel}
            ></input>

            <input
              type="button"
              className={addBlue}
              id="addNewPlan"
              value="Add"
              onClick={addPlan}
            ></input>
          </div>
          <input
            type="textarea"
            placeholder="Enter Plan Name"
            id="newPlan"
            name="newPlan"
            value={newPlanInput}
            onChange={handleChange}
          ></input>
          <label htmlFor="newPlan"></label>
          <p className={planWarning}>{warningMessage}</p>
        </div>
        <div className={deleteWarning}>
          <p>Delete plan "{delPlan}"?</p>
          <input
            type="button"
            value="cancel"
            className="confirmButton cancelConfirm"
            onClick={() => setDeleteWarning("hidden")}
          ></input>
          <input
            type="button"
            value="yes"
            className="confirmButton yesConfirm"
            onClick={removePlan}
          ></input>
        </div>
      </div>
    </>
  );
}
