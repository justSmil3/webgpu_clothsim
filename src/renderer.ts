export class Renderer {
  canvas: HTMLCanvasElement;

  adapter!: GPUAdapter;
  device!: GPUDevice;
  format!: GPUTextureFormat;
  context!: GPUCanvasContext;

  uniformBuffer!: GPUBuffer;
  bindGroups!: Array<GPUBindGroup>;
  bindGroupLayouts!: Array<GPUBindGroupLayout>;
  renderPipeline!: GPURenderPipeline;

  constructor(canvas: HTMLCanvasElement){
    this.canvas = canvas;
  }

  async initialize(){
    await this.setupDevice();
    this.createAssets();
    await this.makePipeline();
    this.render();
  }

  async setupDevice(){
    this.adapter = <GPUAdapter> await navigator.gpu?.requestAdapter();
    this.device = <GPUDevice> await this.adapter?.requestDevice();
    this.context = <GPUCanvasContext> this.canvas.getContext("webgpu");
    this.format = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({
      device: this.device,
      format: this.format,
      alphaMode: "opaque"
    });
  }

  createAssets(){

  }

  async makePipeline(){
    
  }

  render(){
    const commandEncoder: GPUCommandEncoder = this.device.createCommandEncoder();
    const textureView: GPUTextureView = this.context.getCurrentTexture().createView();
    const renderpass: GPURenderPassEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: textureView,
        clearValue: {r: 0.3, g: 0.3, b: 0.3, a: 1.0},
        loadOp: "clear",
        storeOp: "store"
      }]
    });
    renderpass.end();
    this.device.queue.submit([commandEncoder.finish()]);
  }
}
