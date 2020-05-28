import asyncMain from '../service/asyncMain';

import {withContainer} from '../components/Wrapper/';
import NotFound from '../components/NotFound/NotFound';

export default {
  name: "NotFoundPage",
  async asyncData (app) {
    await asyncMain(app)
  },
  components: {
    withContainer,
    NotFound
  },
  render (h) {
    return h(withContainer, [ h(NotFound) ])
  }
}
