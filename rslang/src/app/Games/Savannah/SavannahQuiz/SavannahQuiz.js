import SavannahQuestion from './SavannahQuestion/SavannahQuestion';
import SavannahAnswers from './SavannahAnswers/SavannahAnswers';
import LinearDeterminate from "../../components/LinearDeterminate/LinearDeterminate";
import Circular from "../../components/Circular/Circular";

const SavannahQuiz = () => {
  return (
    <>
      <LinearDeterminate/>
      <SavannahQuestion />
      <SavannahAnswers />
      <Circular/>
    </>
  );
};

export default SavannahQuiz;
