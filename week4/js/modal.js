export default {
    template: `        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="imgUrl">圖片網址</label>
              <input type="text" class="form-control" id="imgUrl" placeholder="請輸入圖片連結"
                v-model="tempProduct.imageUrl[0]">
              <img class="img-fluid" :src="tempProduct.imageUrl" alt>
            </div>
          </div>

          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                  v-model="tempProduct.category">
              </div>
              <div class="form-group col-md-6">
                <label for="unit">單位</label>
                <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                  v-model="tempProduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                  v-model="tempProduct.price">
              </div>
            </div>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea class="form-control" id="description" rows="2" placeholder="請輸入產品描述"
                v-model="tempProduct.description"></textarea>
            </div>
            <div class="form-group">
              <label for="content">產品內容</label>
              <textarea class="form-control" id="content" rows="2" placeholder="請輸入產品內容"
                v-model="tempProduct.content"></textarea>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="enabled" v-model="tempProduct.enabled"
                value="option1">
              <label class="form-check-label" for="enabled">是否啟用</label>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-dark" @click="updateProducts">確認</button>
        </div>
      </div>
    </div>
  </div>`,

    data() {
        return {
        };

    },
    props: ["tempProduct", "api", "isNew"],
    methods: {
        updateProducts() {
            let vm = this;
            if (vm.tempProduct.id !== undefined) { //如果id不等於undefined
                let url = `${vm.api.path}${vm.api.uuid}/admin/ec/product/${vm.tempProduct.id}`;
                axios.patch(url, vm.tempProduct)
                    .then(function (res) {
                        // console.log(res);
                        vm.$emit("update");//觸發外層事件
                    })
                    .catch(function (err) {
                        console.log(err);

                    })
            }
            else {
                let id = new Date().getTime(); //新增一個id
                vm.tempProduct.id = id; //賦予到tempProduct的id
                let url = `${vm.api.path}${vm.api.uuid}/admin/ec/product`;
                axios.post(url, vm.tempProduct)
                    .then(function (res) {
                        console.log(res);
                        vm.tempProduct = {
                            imageUrl: []
                        };
                        vm.$emit('update');
                        $('#addModal').modal('hide');
                    })
                    .catch(function (err) {
                        console.log(err);

                    })
            }
        },
        //上傳檔案
        // uploadFile() {
        //     let vm = this;
        //     let uploadedFile = vm.$refs.file.file[0];
        //     let formData = new formData();
        //     formData.append("file", uploadedFile);
        //     let url = `${vm.api.path}${vm.api.uuid}/admin/storage`;
        //     vm.status.fileUploading = true;
        //     axios.post(url, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     }).then(function(res){
        //         if(res.status===200){
        //             vm.tempProduct.imageUrl.push(res.data.data.path);
        //         }
        //     }).catch(function(err){
        //         alert("上傳不可超過 2 MB");
        //         vm.status.fileUploading = false;
        //     })
        // }



    }

}