import { ref, onMounted } from "vue";

// Global state để đảm bảo chỉ load một lần
const isLoaded = ref(false);
const isLoading = ref(false);

export function useSprite() {
  const loadSprite = () => {
    // Nếu đã load hoặc đang loading thì return
    if (isLoaded.value || isLoading.value) return;

    // Check if sprite already exists
    if (document.getElementById("svg-sprite-symbols")) {
      isLoaded.value = true;
      return;
    }

    // Đánh dấu đang loading để prevent multiple requests
    isLoading.value = true;

    // Load sprite from the actual sprites.svg file
    fetch(new URL("../assets/icons/sprites.svg", import.meta.url).href)
      .then((response) => response.text())
      .then((svgContent) => {
        // Create sprite container
        const spriteDiv = document.createElement("div");
        spriteDiv.id = "svg-sprite-symbols";
        spriteDiv.style.display = "none";
        spriteDiv.style.position = "absolute";
        spriteDiv.style.width = "0";
        spriteDiv.style.height = "0";

        // Inject SVG content
        spriteDiv.innerHTML = svgContent;
        document.body.appendChild(spriteDiv);
        isLoaded.value = true;
        isLoading.value = false;
      })
      .catch(() => {
        // Reset loading state on error
        isLoading.value = false;
        // Fallback to basic icons if file loading fails
        // loadFallbackSprites();
      });
  };

  // const loadFallbackSprites = () => {
  //   if (document.getElementById("svg-sprite-symbols")) {
  //     isLoaded.value = true;
  //     return;
  //   }

  //   const spriteDiv = document.createElement("div");
  //   spriteDiv.id = "svg-sprite-symbols";
  //   spriteDiv.style.display = "none";
  //   spriteDiv.style.position = "absolute";
  //   spriteDiv.style.width = "0";
  //   spriteDiv.style.height = "0";

  //   // Minimal fallback sprites
  //   spriteDiv.innerHTML = `
  //     <svg xmlns="http://www.w3.org/2000/svg">
  //       <symbol id="home" viewBox="0 0 24 24">
  //         <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //         <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </symbol>
  //       <symbol id="user" viewBox="0 0 24 24">
  //         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //         <circle cx="12" cy="7" r="4" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </symbol>
  //       <symbol id="settings" viewBox="0 0 24 24">
  //         <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </symbol>
  //     </svg>
  //   `;

  //   document.body.appendChild(spriteDiv);
  //   isLoaded.value = true;
  // };

  onMounted(() => {
    loadSprite();
  });

  return {
    isLoaded,
    loadSprite,
  };
}
