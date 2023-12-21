import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { UserAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import Img from "../img/img.png";
import Attach from "../img/attach.png";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();
  const [img, setImg] = useState(null);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(value.trim() === "" && !img) {
      alert("Enter valid message!");
      return;
    }
    console.log("file select", img)
      if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.then(
        (snapshot) => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("snapshot", snapshot)
            console.log("getDownloadURL", downloadURL)
            const { uid, displayName, photoURL } = currentUser; 
            await addDoc(collection(db, "messages"), {
              text: value,
              name: displayName,
              avatar: photoURL,
              createdAt: serverTimestamp(),
              img: downloadURL,
              uid
            })
          });
        },
        (error) => {
          //TODO:Handle Error
          console.log("uploadTask", error)
        }
      );
    }else{
      const { uid, displayName, photoURL } = currentUser; 
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        img: "",
        uid
      })
    }
    setValue("");
  }

  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file" className="rounded-r-lg">
          {img == null ? <img src={Img} height="3rem" alt=""/>: <img src={Attach} alt=""/>}
        </label>
        <button type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">Send</button>
      </form>
    </div>
  )
}

export default SendMessage