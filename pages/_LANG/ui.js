import asyncMain from '../../service/asyncMain';
import {withContainer} from '../../components/Wrapper/';

import DemonstrationInputsRadio from '../../demonstration/DemonstrationInputsRadio';
import DemonstrationCheckbox from '../../demonstration/DemonstrationCheckbox';
import DemonstrationInputsFields from '../../demonstration/DemonstrationInputsFields';
import DemonstrationTypography from '../../demonstration/DemonstrationTypography';
import DemonstrationBtns from '../../demonstration/DemonstrationBtns';
import DemonstrationCardProduct from '../../demonstration/DemonstrationCardProduct';
import DemonstrationCardProduct2 from '../../demonstration/DemonstrationCardProduct2';
import DemonstrationSelect from '../../demonstration/DemonstrationSelect';

export default {
  name: 'index',
  async asyncData (app) {
    await asyncMain(app)
  },
  components: {
    DemonstrationInputsRadio,
    DemonstrationCheckbox,
    DemonstrationInputsFields,
    DemonstrationTypography,
    DemonstrationBtns,
    DemonstrationCardProduct,
    DemonstrationCardProduct2,
    DemonstrationSelect
  },
  render (h) {
    return h(withContainer, [
      h(DemonstrationCardProduct),
      h(DemonstrationCardProduct2),
      h(DemonstrationSelect),
      h(DemonstrationInputsRadio),
      h(DemonstrationCheckbox),
      h(DemonstrationInputsFields),
      h(DemonstrationTypography),
      h(DemonstrationBtns),
    ])
  }
}
