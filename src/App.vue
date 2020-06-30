<!-- App.vue --> 
<template>
  <div>{{msg}}</div>
</template>

<script>
import { runner as Paddlejs } from "paddlejs";

const paddlejs = new Paddlejs({
  modelPath: "jsModel", // model path
  fileCount: 1, // model data file count
  feedShape: {
    // input shape
    fw: 64,
    fh: 64
  },
  fetchShape: [1, 3, 128, 128], // output shape
  fill: "#fff", // fill color when resize image
  needBatch: true, // whether need to complete the shape to 4 dimension
  inputType: "image" // whether is image or video
});
const loadModel = async () => {
  // load paddlejs model and preheat
  await paddlejs.loadModel();
};

loadModel();

export default {
  data() {
    return {
      msg: "i am parcel demo"
    };
  }
};
</script>