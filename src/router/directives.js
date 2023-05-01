import { spriteService } from "../services/sprite.service"

const sprite = {
 mounted: (el, { value }) => {
  const styles = spriteService(value)
  el.style.backgroundImage = url('@/assets/images/insta-sprite.png');

 }
}