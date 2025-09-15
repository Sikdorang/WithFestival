import GunImage from '@/assets/images/img_gun.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CtaButton from '../components/common/buttons/CtaButton';
import TextInput from '../components/common/inputs/TextInput';
import TopBar from '../components/common/layouts/TopBar';
import DeleteConfirmModal from '../components/common/modals/DeleteConfirmModal';

export default function Games() {
  const navigate = useNavigate();

  const [chamberCount, setChamberCount] = useState(2);
  const [chambers, setChambers] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const bangSound = new Audio('/sounds/effect_gun_shot.mp3');
  const clickSound = new Audio('/sounds/effect_gun_tik.mp3');
  const reloadSound = new Audio('/sounds/effect_gun_reload.mp3');

  const handleGameStart = () => {
    reloadSound.play();

    const newChambers = Array(chamberCount).fill(false);
    const bulletPosition = Math.floor(Math.random() * chamberCount);
    newChambers[bulletPosition] = true;

    setChambers(newChambers);
    setCurrentIndex(0);
    setGameOver(false);
    setMessage('');
    setIsGameStarted(true);
  };

  const handleGunClick = () => {
    if (gameOver) return;

    const hasBullet = chambers[currentIndex];

    if (hasBullet) {
      bangSound.play();
      setMessage(`${currentIndex + 1}번 당첨 !`);
      setGameOver(true);
    } else {
      clickSound.play();
      setMessage(`${currentIndex + 1}번째 약실: 비어있음`);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleReset = () => {
    setIsGameStarted(false);
    setMessage('');
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 text-center">
      {!isGameStarted ? (
        <div className="flex flex-col items-center gap-4">
          <TopBar />
          <div className="text-t-1 mb-30">Russian Roulette</div>

          <label htmlFor="chamberInput" className="text-st-2">
            인원 수를 입력해주세요 !
          </label>

          <TextInput
            id="chamberInput"
            type="number"
            min="2"
            max="10"
            value={chamberCount}
            onChange={(e) => setChamberCount(Number(e.target.value))}
            limitHide
          />

          <DeleteConfirmModal
            title={'더 즐거운 플레이를 위해 소리를 크게 키워주세요 !'}
            description={'🥹 🔫'}
            cancelButtonText={'좀 쫄려요...'}
            confirmButtonText={'확인했어요!'}
            onConfirm={handleGameStart}
          >
            <CtaButton
              text="게임 시작"
              color="green"
              size="small"
              radius="_2xl"
            />
          </DeleteConfirmModal>
          <CtaButton
            text="돌아가기"
            color="gray"
            size="small"
            radius="_2xl"
            onClick={() => navigate(-1)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img
            src={GunImage}
            alt="game"
            onClick={handleGunClick}
            className={`transition-transform duration-100 ${
              gameOver
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer active:scale-95'
            }`}
          />
          <p className="h-8 text-2xl font-semibold">{message}</p>
          {gameOver && (
            <button
              onClick={handleReset}
              className="mt-4 rounded-lg bg-green-500 px-6 py-3 text-white transition-colors hover:bg-green-600"
            >
              다시하기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
