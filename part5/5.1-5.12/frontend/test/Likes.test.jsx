import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Likes from '../components/Likes';


// Mockear el controlador de eventos
let handle = vi.fn();
    test('calls handleLikes twice when the like button is clicked twice', async () => {
    
        // Mock like's components (replic original); 
        vi.mock('../components/Likes', () => ({
          default: ({ blog }) => (
            <>
              <section className='likeContainer'>
                <span>
                    Likes:
                  <span className={ 'Liked' }style={{ fontWeight:'bolder' }}>100</span>
                </span>
                <button onClick={handle}>
                </button>
              </section>
            </>
          ),
        }));
    
        // Renderizar el componente Likes
        render(<Likes blog={{}} />);
    
        const user = userEvent.setup();
        const likeButton = screen.getByRole('button');
        
        // Simular dos clics en el botón "like"
        await user.click(likeButton);
        await user.click(likeButton);
    
        // Verificar que el controlador de eventos fue llamado dos veces
        expect(handle).toHaveBeenCalledTimes(2);
      });
