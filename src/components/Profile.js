import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile({ user }) {
  const [address, setAddress] = useState("");
  const [preference, setPreference] = useState("");

  const saveProfile = async () => {
    await setDoc(doc(db, "users", user.uid), {
      address,
      preference,
    });

    alert("Profile saved");
  };

  return (
    <div>
      <h2>User Profile</h2>

      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Preferred Cuisine"
        onChange={(e) => setPreference(e.target.value)}
      />

      <br /><br />

      <button onClick={saveProfile}>Save</button>
    </div>
  );
}
