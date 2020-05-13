<template>
  <div class="header-middle">
    <div class="container">
      <div class="row justify-space-between align-items-center">
        {{/* Лого */}}
        <div class="col-auto">
          <router-link :to="{ path: '/' }" class="header-logo">
            <img src="~/assets/images/sts-logo.png" alt="" />
          </router-link>
        </div>
        {{/* Лого - END */}}

        {{/* Поиск в шапке */}}
        <div class="col-auto">
          <HeaderMiddleSearch/>
        </div>
        {{/* Поиск в шапке - END */}}

        {{/* Ссылки в шапке */}}
        <div class="col-auto">
          <HeaderMiddleLinks :links="links"/>
        </div>
        {{/* Ссылки в шапке - END */}}

        {{/* Контакты в шапке */}}
        <div class="col-auto">
          <HeaderMiddleContacts :contacts="contacts"/>
        </div>
        {{/* Контакты в шапке - END */}}
      </div>
    </div>
  </div>
</template>

<script>
    import './index.scss';

    import HeaderMiddleSearch from "./components/HeaderMiddleSearch/HeaderMiddleSearch";
    import HeaderMiddleLinks from "./components/HeaderMiddleLinks/HeaderMiddleLinks";
    import HeaderMiddleContacts from "./components/HeaderMiddleContacts/HeaderMiddleContacts";

    export default {
        name: "HeaderMiddle",
        data () {
            return {
                links: [
                    { type: 'self', name: 'О нас', path: '/' },
                    { type: 'self', name: 'Наш адрес', path: '/' },
                    { type: 'self', name: 'Оплата', path: '/' },
                    { type: 'self', name: 'Связаться с нами', path: '/' },
                    { type: 'self', name: 'Рассрочка', path: '/' },
                ],
                contacts: [
                    { icon: { type: 'ico', path: 'sts-iconclock' }, title: '<b>Время работы:</b>', inner: 'В будние дни: 9:00–18:00<br>Воскресенье: Выходной' },
                    { icon: { type: 'ico', path: 'sts-iconphone' }, title: '<b>Контактный номер:</b>', inner: '<a href="tel:+998712070039">+998(71)207 00 39</a>' }
                ]
            }
        },
        components: {
            HeaderMiddleSearch,
            HeaderMiddleLinks,
            HeaderMiddleContacts
        }
    }
</script>
