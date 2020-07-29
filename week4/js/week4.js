import pagination from "./pagination.js";
import modal from "./modal.js";
import delModal from "./delModal.js";


Vue.component('pagination', pagination);
Vue.component('modal', modal);
Vue.component('delModal', delModal);


new Vue({
    el: "#app",
    data: {
        products: [],
        pagination: {},
        tempProduct: {
            imageUrl: [],
        }, //要修改的product暫存在tempProduct
        api: {
            uuid: "21c193ae-372a-4858-86f6-6645bc236f07",
            path: 'https://course-ec-api.hexschool.io/api/',
        },
        token: "",
        isNew: "",
        loadingBtn: "",
    },
    methods: {
        
        openModel(isNew, item) { //列表有缺description所以要重新取得
            let vm = this;
            switch (isNew) {
                case "new":
                    vm.tempProduct = {
                        imageUrl: [],
                    };
                    vm.enabled = true;
                    $('#addModal').modal('show');
                    break;
                case "edit":
                    vm.loadingBtn = item.id;
                    let url = `${vm.api.path}${vm.api.uuid}/admin/ec/product/${item.id}`
                    axios.get(url)
                        .then(function (res) {
                            console.log(res);
                            vm.tempProduct = res.data.data; //把api裡的data複製到tempProduct
                            $('#addModal').modal('show');
                            vm.loadingBtn = "";//清除item.id
                        })

                    break;
                case "del":
                    $('#delProductModal').modal('show');
                    vm.tempProduct = Object.assign({}, item); //淺拷貝
                    break;
                default:
                    break;
            }
        },
       
        getProducts(num = 1) {
            // console.log(num);
            let vm = this;
            let url = `${vm.api.path}${vm.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(url)
                .then(function (res) {
                    console.log(res);
                    vm.products = res.data.data;
                    vm.pagination = res.data.meta.pagination;

                    if (vm.tempProduct.id) { //如果tempProduct的id存在
                        vm.tempProduct = {
                            imageUrl: [], 
                        };//清空避免重複觸發
                        $('#addModal').modal('hide');//從外面開從外面關
                    }
                });
        },

    },
    created() {
        let vm = this;
        vm.token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1'
        );
        axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`;

        vm.getProducts();
    },

})