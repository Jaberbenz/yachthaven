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
      <div className="home-container">
        <header className="home-header">
          <span className="menu"><span class="material-symbols-outlined">menu</span></span>
          <span className="logo">YH</span>
          <span className="connexion"><span class="material-symbols-outlined">account_circle</span></span>
        </header>
        <main className="home-main">
          <section className="welcome-section">
            <h1>BIENVENUE SUR YACHTHAVEN</h1>
            <p>Ad amet irure officia laboris anim eu consequat. Ex ipsum excepteur sint sint voluptate laboris aute sunt Lorem sint sit aute. Deserunt consectetur voluptate est eu culpa ut exercitation. Pariatur reprehenderit aliqua anim tempor officia proident voluptate magna minim cupidatat in ad aliqua cillum. Elit adipisicing dolore non tempor. Elit tempor non in do adipisicing in aute commodo reprehenderit labore officia.</p>          </section>
          <section className="services-section">
            <h2>NOS SERVICES</h2>
            <div className="services-carousel">
              <button className="carousel-button" aria-label="Previous slide"><span class="material-symbols-outlined">chevron_left</span></button>
              <div className="carousel-image-placeholder">
                {/* This will be your red card */}
              </div>
              <button className="carousel-button" aria-label="Next slide"><span class="material-symbols-outlined">chevron_right</span></button>
            </div>

          </section>
          <div className="actions">
            <button className="btn-reserve">RESERVER</button>
          </div>
        </main>
      </div>
      {!userType && (
        <div className="signup-container">
        <h3 className="signup-title">NOUVEAU CHEZ YACHTHAVEN ?</h3>
        <p className="signup-subtitle">INSCRIVEZ-VOUS EN TANT QUE</p>
        <button className="signup-button client" onClick={() => setUserType("client")}>Client</button>
        <div className="divider">
          <hr className="divider-line" />
          <span className="divider-text">OU</span>
        </div>
        <button className="signup-button prestataire" onClick={() => setUserType("prestataire")}>Prestataire</button>
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