import "./Settings.css"

export default function Settings(){
    return(
        <div>
            
        <h3>General</h3>
        <p>Profile</p>
        <div className="hidden">
        <label htmlFor="first-name">First Name</label>
        <input type="text" name="first-name" id="first-name"></input>
        <label htmlFor="last-name">Last Name</label>
        <input type="text" name="last-name" id="last-name"></input>
        </div>
        <p>Your Account</p>
            <input type="button" value="delete your account" />
        <p>About Us</p>
        </div>
    )
}