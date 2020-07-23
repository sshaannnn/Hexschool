new Vue({
    el: "#app",
    data: {
        
            text: "sss"
        ,
        products: [
            {
                id: 1586934917210,
                unit: "隻",
                category: "火",
                title: "小火龍",
                origin_price: 200,
                price: 150,
                description: "巴上的火焰代表牠的心情。開心時火焰會搖曳晃動，生氣時火焰則會猛烈燃燒。",
                content: "",
                is_enabled: 1,
                imageUrl: ["https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/d0ee81f16175c97770192fb691fdda8da1f4f349.png"],
            },
            {
                id: 1586934917211,
                unit: "隻",
                category: "草、毒",
                title: "妙蛙種子",
                origin_price: 250,
                price: 200,
                description: "經常可見牠在太陽下睡午覺的樣子。在沐浴了充足的陽光之後，牠背上的種子就會成長茁壯。",
                content: "",
                is_enabled: 0,
                imageUrl: ["https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cf47f9fac4ed3037ff2a8ea83204e32aff8fb5f3.png"],
            },
            {
                id: 1586934917215,
                unit: "隻",
                category: "蟲",
                title: "綠毛蟲",
                origin_price: 120,
                price: 100,
                description: "身體柔軟，又沒什麼力氣。在自然界，牠的命運就是不斷被當成獵物來捕食。",
                content: "",
                is_enabled: 0,
                imageUrl: ["https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/68f0cec6bcba20a0c53db3d8cfce81bd319d2c82.png"],
            },
        ],

        tempProduct: {}, //要修改的project暫存在tempProduct
    },
    methods: {
        updateProducts() {
            let vm = this;
            if (vm.tempProduct.id) { //情況一：tempProduct已經有值
                let id = vm.tempProduct.id;
                vm.products.forEach(function (item, index) {
                    if (item.id === id) {
                        vm.products[index] = vm.tempProduct; //把tempProduct裡的值覆蓋掉舊的products內容
                    }
                });
            } else { //情況二：tempProduct是空的
                let id = new Date().getTime(); //新增一個id
                vm.tempProduct.id = id; //賦予到tempProduct的id
                // vm.tempProduct.is_enabled=1;
                vm.products.push(vm.tempProduct); //把tempProduct的值推進products裡
            }
            vm.tempProduct = {}; //把已經推上去的值清空
            $('#addModel').modal('hide');
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
        // test(){
        //     console.log("test");
        // },

    },
})