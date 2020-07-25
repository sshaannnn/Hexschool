new Vue({
    el: "#app",
    data: {
        products: [

        ],
        tempProduct: {}, //要修改的product暫存在tempProduct
        api: {
            uuid: "21c193ae-372a-4858-86f6-6645bc236f07",
            path: 'https://course-ec-api.hexschool.io/api/',
        },
        token: "",
        isNew: "",
    },
    methods: {
        updateProducts() {
        },
        openModel(isNew, item) {
            vm = this;
            switch (isNew) {
                case "new":
                    vm.tempProduct = {
                        imageUrl: [],
                    };
                    vm.is_enabled = true;
                    $('#addModel').modal('show');
                    break;
                case "edit":
                    vm.tempProduct = Object.assign({}, item); //淺拷貝
                    $('#addModel').modal('show');
                    break;
                case "del":
                    $('#delProductModel').modal('show');
                    vm.tempProduct = Object.assign({}, item); //淺拷貝
                    break;
                default:
                    break;
            }
        },
        delProduct() {
            let vm = this;
            if (vm.tempProduct.id) {
                let id = vm.tempProduct.id;
                vm.products.forEach(function (item, index) {
                    if (item.id === id) {
                        vm.products.splice(index, 1);
                        vm.tempProduct = {};
                    }
                });
            }
            $('#delProductModel').modal('hide');
        },
        getProducts() {
            let url = `${this.api.path}${this.api.uuid}/admin/ec/products`;
            axios.get(url)
                .then(function (res) {
                    console.log(res);
                })
        }

    },
    created() {
        this.token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        this.getProducts();
    },
})