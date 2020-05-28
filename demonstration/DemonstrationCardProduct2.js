import {withNormalBlock} from '../components/Wrapper/'
import ProductCard from '../components/ProductCard/ProductCard'

export default {
  name: 'DemonstrationCardProduct2',
  data () {
    return {
      products: [
        { id: 10, name: 'Моноблок Avtech COMBO PC X6 Моноблок Avtech COMBO PC X6', image: 'https://sts.uz/image/cache/catalog/monobloki/x6-1000x1000.jpg', price: 5050000, oldPrice: 6000000, shortInfo: ['LCD 24 1920x1080 Full HD', 'CPU Intel Celeron® J1900 2.0 GHz 4 ядра', 'HDD 500GB Seagate, 2GB DDR3L/1600', 'USB 3.0 x2шт, USB 2.0 x2шт', 'LCD 24 1920x1080 Full HD', 'CPU Intel Celeron® J1900 2.0 GHz 4 ядра', 'HDD 500GB Seagate, 2GB DDR3L/1600', 'USB 3.0 x2шт, USB 2.0 x2шт'], moreClass: 'product-list' },
        { id: 11, name: 'Моноблок Avtech V8-H110/4400T LCD 23.8 / Windows 10', image: 'https://sts.uz/image/cache/catalog/monobloki/v8-1000x1000.jpg', price: 6550000, oldPrice: 7000000, shortInfo: ['LCD 23.8 IPS A+ 1920x1080 Full HD LCD 23.8 IPS A+ 1920x1080 Full HD LCD 23.8 IPS A+ 1920x1080 Full HD', ' S1151 Intel® Pentium Dual Core G4400Т 2.9 GHz', 'HDD 500GB Seagate', '4GB DDR4'], moreClass: 'product-list' }
      ]
    }
  },
  render (h) {
    const self = this
    return h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
        h('h3', 'Вариант: Список')
      ]),
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
        h('div', { class: 'row' }, self.products.map(item => h('div', { class: 'col-xxl-12' }, [h(ProductCard, { props: item })])))
      ])
    ])
  }
}
