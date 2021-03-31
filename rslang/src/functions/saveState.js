export default function saveState(saveName, state) {
  const currentState = { ...state };
  localStorage.setItem(saveName, JSON.stringify(currentState));
}
