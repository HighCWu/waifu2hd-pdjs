// main.js
import { runner as Paddlejs } from "paddlejs";
// 模型feed数据
const feedShape = {
    'waifu2hd': {
        fw: 64,
        fh: 64
    }
};

// 模型fetch数据
const fetchShape = {
    'waifu2hd': [1, 3, 128, 128]
};

const modelType = 'waifu2hd';
const {fw, fh} = feedShape[modelType];
const outputShape = fetchShape[modelType];

const paddlejs = new Paddlejs({
  modelPath: "./jsModel", // model path
  fileCount: 1, // model data file count
  getFileName(i) { // 获取第i个文件的名称
    return 'chunk_' + i + '.dat';
  },
  feedShape: {fw, fh},
  targetShape: [1, 3, fh, fw],
  scale: fh, // temp
  fetchShape: outputShape, // output shape
  fill: "#fff", // fill color when resize image
  needBatch: true, // whether need to complete the shape to 4 dimension
  inputType: "image" // whether is image or video
});


let firstTime = true;

window.statistic = [];
async function run(input) {
    if (firstTime) await paddlejs.loadModel(); // Loading problem
    else firstTime = true;
    // run model
    await paddlejs.predict(input, postProcess);

    let N = outputShape[0];
    let C = outputShape[1];
    let H = outputShape[2];
    let W = outputShape[3];
    let nhwcShape = [N, H, W, C];
    console.log(nhwcShape);

    function postProcess(data) {
        // data为预测结果
        console.log(data);
    }
};

var image = '';
function selectImage(file) {
    if (!file.files || !file.files[0]) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function (evt) {
        let img = document.getElementById('image');
        img.src = evt.target.result;
        img.onload = function() {
            run(img);
        };
        image = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
}
// selectImage
document.getElementById("uploadImg").onchange = function () {
    selectImage(this);
};