import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">404 - Not Found</h2>
        <p>Извините, но страница, которую вы ищете, не найдена.</p>
        <Button onClick={() => navigate('/')}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound; 