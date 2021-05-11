import { db } from "../../config/firebase";

export default async function getMaterials(req, res) {
  const { limit, userId } = await req.body;

  // validator
  if (!userId) {
    let message = "userId is required";
    return res
      .status(400)
      .send({ status: false, message, data: null, error: "expected userId" });
  }

  let materialRef = db
    .collection("materials")
    .orderBy("created", "desc")
    .where("uid", "==", 0);

  // include limit in ref if it is provided in payload
  if (limit) {
    materialRef = db
      .collection("materials")
      .orderBy("created", "desc")
      .where("uid", "==", userId)
      .limit(limit);
  }

  await materialRef
    .get()
    .then((snapshot) => {
      let materials = [];

      snapshot.forEach((doc) => {
        materials.push({
          materialId: doc.id,
          ...doc.data(),
        });
      });

      console.log("doc data:", materials);
      res.status(200).send({
        status: true,
        message: "materials",
        data: materials,
        error: null,
      });
    })
    .catch((error) => {
      let message = "Could not fetch materials!";
      console.log(message);
      console.log(error);
      res.status(400).send({ status: false, message, data: null, error });
    });
}
