export default{
    template:`<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <label for="delProduct">是否刪除 <strong class="text-danger">{{tempProduct.title}}</strong>
          商品(刪除後將無法恢復)。</label>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-dark" @click="delProduct">確認刪除</button>
      </div>
    </div>
  </div>`,
  data(){
      return{
      }
  },
  props:["tempProduct","api"],
  methods:{
    delProduct(){
        let vm=this;
        let url=`${vm.api.path}${vm.api.uuid}/admin/ec/product/${vm.tempProduct.id}`;
        axios.delete(url,vm.tempProduct)
        .then(function(res){
            console.log(res);
            $('#delProductModal').modal('hide');
            vm.$emit("update");//觸發外層事件要更新資料
            
        });
    },
  }
}