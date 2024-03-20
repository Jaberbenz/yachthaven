// import { useEffect, useState } from "react";
// import { Auth } from "./components/auth";
// import { db, auth } from "./config/firebase";
// import {
//   getDocs,
//   collection,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";

// function App() {
//   const [userList, setUserList] = useState([]);

//   //new user

//   const [newUserName, setNewUserName] = useState("");
//   const [newUserSurname, setNewUserSurname] = useState("");
//   const [newUserEmail, setNewUserEmail] = useState("");
//   const [newUserPwd, setNewUserPwd] = useState("");

//   //update user name
//   const [updatedName, setUpdatedName] = useState("");

//   const userCollectionRef = collection(db, "user");

//   useEffect(() => {
//     const getUserList = async () => {
//       //read from db
//       try {
//         const data = await getDocs(userCollectionRef);
//         const filtredData = data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         setUserList(filtredData);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserList();
//   }, []);

//   const addUser = async () => {
//     try {
//       await addDoc(userCollectionRef, {
//         Nom: newUserSurname,
//         Prénom: newUserName,
//         Email: newUserEmail,
//         MotDePasse: newUserPwd,
//         userId: auth?.currentUser?.uid,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteUser = async (id) => {
//     const userDoc = doc(db, "user", id);
//     await deleteDoc(userDoc);
//   };

//   const updateUserName = async (id) => {
//     const userDoc = doc(db, "user", id);
//     await updateDoc(userDoc, {Nom: updatedName});
//   };

//   return (
//     <div className="App">
//       <Auth />
//       <div>
//         <input
//           placeholder="Nom"
//           onChange={(e) => setNewUserSurname(e.target.value)}
//         />
//         <input
//           placeholder="Prenom"
//           onChange={(e) => setNewUserName(e.target.value)}
//         />
//         <input
//           placeholder="Email"
//           type="email"
//           onChange={(e) => setNewUserEmail(e.target.value)}
//         />
//         <input
//           placeholder="mot de passe"
//           type="password"
//           onChange={(e) => setNewUserPwd(e.target.value)}
//         />
//         <button onClick={addUser}> Submit user </button>
//       </div>

//       <div>
//         {userList.map((user) => (
//           <div key={user.id}>
//             <h1> {user.Nom} </h1>
//             <h2> {user.Prénom} </h2>
//             <button onClick={() => deleteUser(user.id)}> Delete name </button>

//             <input
//               placeholder="new user name"
//               onChange={(e) => setUpdatedName(e.target.value)}
//             />
//             <button onClick={() => updateUserName(user.id)}>Update name</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import UserSignup from "./components/UserSignup";
import PrestataireSignup from "./components/PrestataireSignup";

function App() {
  const [userType, setUserType] = useState(null);

  const handleGoBack = () => {
    setUserType(null);
  };

  return (
    <div className="App">
      {!userType && (
        <div>
          <h1>Bienvenue ! Veuillez choisir votre type dinscription :</h1>
          <button onClick={() => setUserType("client")}>Client</button>
          <button onClick={() => setUserType("prestataire")}>
            Prestataire
          </button>
        </div>
      )}

      {userType === "client" && (
        <div>
          <UserSignup />
          <button onClick={handleGoBack}>Retour</button>
        </div>
      )}
      {userType === "prestataire" && (
        <div>
          <PrestataireSignup />
          <button onClick={handleGoBack}>Retour</button>
        </div>
      )}
    </div>
  );
}

export default App;
