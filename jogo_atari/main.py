import pygame
import sys
from settings import *
from sprites import Player, Asteroid

class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("Jogo Atari - Batalha Espacial")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont(None, 36)
        self.running = True
        self.score = 0
        self.frame_count = 0
        
        # Grupos de sprites
        self.all_sprites = pygame.sprite.Group()
        self.asteroids = pygame.sprite.Group()
        self.bullets = pygame.sprite.Group()
        
        # Inicializar jogador
        self.player = Player()
        self.all_sprites.add(self.player)

    def new_asteroid(self):
        asteroid = Asteroid(self.score)
        self.all_sprites.add(asteroid)
        self.asteroids.add(asteroid)

    def events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    bullet = self.player.shoot()
                    self.all_sprites.add(bullet)
                    self.bullets.add(bullet)

    def update(self):
        self.all_sprites.update()
        
        # Spawn de asteroides com dificuldade progressiva
        self.frame_count += 1
        # Diminui o tempo de spawn a cada 50 pontos (aumenta a quantidade)
        current_spawn_rate = max(20, ASTEROID_SPAWN_RATE - (self.score // 50) * 8)
        
        if self.frame_count >= current_spawn_rate:
            self.new_asteroid()
            self.frame_count = 0
            
        # Verificar colisões tiro -> asteroide
        hits = pygame.sprite.groupcollide(self.asteroids, self.bullets, True, True)
        for hit in hits:
            self.score += 10
            
        # Verificar se asteroide chegou ao fundo da tela
        for asteroid in self.asteroids:
            if asteroid.rect.top > HEIGHT:
                self.running = False # Game Over se asteroide passar
                
        # Verificar colisões jogador -> asteroide
        hits = pygame.sprite.spritecollide(self.player, self.asteroids, False)
        if hits:
            self.running = False

    def draw(self):
        self.screen.fill(BLACK)
        self.all_sprites.draw(self.screen)
        
        # Desenhar placar
        score_text = self.font.render(f"Score: {self.score}", True, WHITE)
        self.screen.blit(score_text, (10, 10))
        
        pygame.display.flip()

    def show_game_over(self):
        self.screen.fill(BLACK)
        go_text = self.font.render("GAME OVER", True, RED)
        score_text = self.font.render(f"Final Score: {self.score}", True, WHITE)
        restart_text = self.font.render("Pressione qualquer tecla para reiniciar", True, YELLOW)
        
        go_rect = go_text.get_rect(center=(WIDTH/2, HEIGHT/2 - 30))
        score_rect = score_text.get_rect(center=(WIDTH/2, HEIGHT/2 + 10))
        restart_rect = restart_text.get_rect(center=(WIDTH/2, HEIGHT/2 + 50))
        
        self.screen.blit(go_text, go_rect)
        self.screen.blit(score_text, score_rect)
        self.screen.blit(restart_text, restart_rect)
        pygame.display.flip()
        
        # Pequeno atraso para evitar reiniciar sem querer
        pygame.time.wait(500)
        pygame.event.clear()
        
        waiting = True
        while waiting:
            self.clock.tick(FPS)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    return False
                if event.type == pygame.KEYUP:
                    return True
        return False

    def run(self):
        while self.running:
            self.clock.tick(FPS)
            self.events()
            self.update()
            self.draw()
            
        return self.show_game_over()

if __name__ == "__main__":
    while True:
        game = Game()
        if not game.run():
            break
    pygame.quit()
    sys.exit()
