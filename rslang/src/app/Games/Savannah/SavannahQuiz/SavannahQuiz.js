import SavannahQuestion from './SavannahQuestion/SavannahQuestion';
import SavannahAnswers from './SavannahAnswers/SavannahAnswers';
import LinearDeterminate from '../../components/LinearDeterminate/LinearDeterminate';
import Circular from '../../components/Circular/Circular';
import { useSelector } from 'react-redux';
import { selectPercentRightAnswers, selectProgress } from '../savannahSlice';

const SavannahQuiz = () => {
  const progress = useSelector(selectProgress);
  const percentRightAnswers = useSelector(selectPercentRightAnswers);

  return (
    <>
      <LinearDeterminate progress={progress} />
      <SavannahQuestion />
      <SavannahAnswers />
      <Circular percentRightAnswers={percentRightAnswers} />
    </>
  );
};

export default SavannahQuiz;
