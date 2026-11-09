import asyncio, sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 460, 'height': 820}, device_scale_factor=1.5)
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file:///home/claude/assistant/dist/test.html')
        await pg.wait_for_timeout(800)
        await pg.screenshot(path='dist/ui-accueil.png')
        for q in ['Où le rugby est-il le plus pratiqué ?', 'et le surf ?', 'Évolution du football depuis 2016']:
            await pg.fill('#as textarea', q); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(1500)
        await pg.screenshot(path='dist/ui-conversation.png')
        print('erreurs JS :', errs or 'aucune')
        await b.close()
asyncio.run(main())
