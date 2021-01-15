import { storageRef, storage, db } from "../config/firebase";

export default function useUpload() {
  const storeFile = (file) => {
    return new Promise((resolve, reject) => {
      var metadata = {
        contentType: "application/pdf",
      };

      var uploadTask = storageRef
        .child("files/" + file.name)
        .put(file, metadata);

      uploadTask.on(
        storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log("e don happen");
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const storeImages = (images) => {
    return new Promise((resolve, reject) => {
      var metadata = {
        contentType: "image/jpeg, image/png",
      };

      let image = images[0];

      var uploadTask = storageRef
        .child("images/" + image.name)
        .put(image, metadata);

      uploadTask.on(
        storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log("e don happen");
          console.log(error);
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const storeMaterial = (material) => {
    return new Promise((resolve, reject) => {
      db.collection("materials")
        .add(material)
        .then(() => {
          resolve("success");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
          reject(error);
        });
    });
  };

  return {
    storeFile,
    storeImages,
    storeMaterial,
  };
}
