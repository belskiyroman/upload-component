import axios from "axios";
/*
* Example of a response:
*
* const response = {
	  asset_id: "148c3e2f9e247743d01fd2d8b21ddc45",
	  public_id: "docs_uploading_example/image-20200907-003813_cqtlt5",
	  version: 1600024401,
	  version_id: "4df226a612f3001dc6eb1bf16a13cf38",
	  signature: "ed66cb4fc434c7eea27210dbf3e30ae68334e510",
	  width: 852,
	  height: 2118,
	  format: "png",
	  resource_type: "image",
	  created_at: "2020-09-13T19:13:21Z",
	  tags: [],
	  pages: 1,
	  bytes: 109961,
	  type: "upload",
	  etag: "83330c1f7613a66e53c7264bd2a11baa",
	  placeholder: false,
	  url:
	    "http://res.cloudinary.com/demo/image/upload/v1600024401/docs_uploading_example/image-20200907-003813_cqtlt5.png",
	  secure_url:
	    "https://res.cloudinary.com/demo/image/upload/v1600024401/docs_uploading_example/image-20200907-003813_cqtlt5.png",
	  access_mode: "public",
	  context: {},
	  metadata: { color_id: ["color1", "color2"] },
	  existing: false,
	  original_filename: "image-20200907-003813",
	};
*
* */

type ProgressFn = (num: ProgressEvent) => void;

class CloudinaryService {
  private static request = axios.request;

  public static async uploadImage(file: File, onUploadProgress?: ProgressFn) {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "upload-component");
    return this.send(form, onUploadProgress);
  }

  protected static async send(form: FormData, onUploadProgress?: ProgressFn) {
    try {
      const { data } = await this.request({
        url: `${this.baseURL}/image/upload`,
        method: "POST",
        data: form,
        onUploadProgress,
      });
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private static get baseURL() {
    return `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}`;
  }
}

export default CloudinaryService;
