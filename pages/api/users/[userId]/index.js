import { db } from "../../../../config/firebase";

export default async function handler(req, res) {
  // update user
  if (req.method === "PUT") {
    const { userId } = await req.query;
    const { data } = await req.body;

    const userRef = db.doc(`/users/${userId}`);
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
