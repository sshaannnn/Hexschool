export default {
    template: `
<div class="page">
  <nav aria-label="Page navigation">
      <ul class="pagination">

          <li class="page-item" :class="{'disabled': pages.current_page === 1}">
              <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page-1)">
               <
              </a>
          </li>

          <li class="page-item" v-for="i in pages.total_pages" :key="i" :class="{'active': pages.current_page === i}">
            <a class="page-link" href="#" 
                 @click.prevent="updatePage(i)">
                 {{ i }}
             </a>
          </li>
       
          <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
              <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page+1)"> 
              >
              </a>
          </li>

      </ul>
  </nav>
</div>`,
    props: ["pages"],
    methods: {
        updatePage(num) {
            let vm = this;
            vm.$emit("update", num)
            // console.log(num);

        }, 
       
    }
}