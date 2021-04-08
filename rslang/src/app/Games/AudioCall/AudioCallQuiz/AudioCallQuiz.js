import AudioQuestion from './AudioQuestion/AudioQuestion';
import AudioCallAnswers from './AudioCallAnswers/AudioCallAnswers';
import LinearDeterminate from "../../components/LinearDeterminate/LinearDeterminate";
import Circular from "../../components/Circular/Circular";

const AudioCallQuiz = () => {
  return (
    <>
      <LinearDeterminate/>
      <AudioQuestion />
      <AudioCallAnswers />
      <Circular/>
    </>
  );
};

export default AudioCallQuiz;
