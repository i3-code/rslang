import AudioQuestion from './AudioQuestion/AudioQuestion';
import AudioCallAnswers from './AudioCallAnswers/AudioCallAnswers';
import LinearDeterminate from '../../components/LinearDeterminate/LinearDeterminate';
import Circular from '../../components/Circular/Circular';
import { useSelector } from 'react-redux';
import { selectPercentRightAnswers, selectProgress } from '../../Savannah/savannahSlice';

const AudioCallQuiz = () => {
  const progress = useSelector(selectProgress);
  const percentRightAnswers = useSelector(selectPercentRightAnswers);

  return (
    <>
      <LinearDeterminate progress={progress} />
      <AudioQuestion />
      <AudioCallAnswers />
      <Circular percentRightAnswers={percentRightAnswers} />
    </>
  );
};

export default AudioCallQuiz;
