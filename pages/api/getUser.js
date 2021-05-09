import { db } from "../../config/firebase";

export default async function getUser(req, res) {
  const { userId } = await req.body;

  const userRef = db.doc(`/users/${userId}`);
  const doc = await userRef.get();
  if (!doc.exists) {
    let message = "No such user document!";
    console.log(message);
    res.status(400).send({ status: false, message, data: null, error: null });
  } else {
    console.log("Document data:", doc.data());
    res.status(200).send({
      status: true,
      message: "user data",
      data: doc.data(),
      error: null,
    });
  }
}
