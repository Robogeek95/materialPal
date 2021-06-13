import { db } from "../../../../config/firebase";

export default async function handler(req, res) {
  // get settings
  if (req.method === "GET") {
    const { userId } = await req.query;

    const userRef = db.collection("settings").where("uid", "==", userId);
    const doc = await userRef.get();

    if (!doc.exists) {
    console.log(doc);

      let message = "No such user document!";
      console.log(message);
      res.status(400).send({ status: false, message, data: null, error: null });
    } else {
      res.status(200).send({
        status: true,
        message: "user data",
        data: doc.data(),
        error: null,
      });
    }
  }

  // update settings
  if (req.method === "PUT") {
    const { userId } = await req.query;
    const { data } = await req.body;

    const userRef = db.collection("settings").where("uid" === userId);
    await userRef
      .update({ ...data })
      .then(() => {
        res.status(200).send({
          status: true,
          message: "Profile successfully updated!",
        });
      })
      .catch((error) => {
        console.log(errorF);
        res.status(400).send({
          status: false,
          message: "Error updating document, this profile may not exist",
          data: null,
          error: null,
        });
      });
  }
}
