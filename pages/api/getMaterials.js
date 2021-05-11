import { db } from "../../config/firebase";

export default async function getMaterials(req, res) {
  const { limit } = await req.body;

  let materialRef = db.collection("materials").orderBy("created", "desc");

  if (limit) {
    materialRef = db
      .collection("materials")
      .orderBy("created", "desc")
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
      res.status(400).send({ status: false, message, data: null, error });
    });
}
