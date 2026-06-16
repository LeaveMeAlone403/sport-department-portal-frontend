import type {GallerySectionProps} from '../types';
import '../styles/GallerySection.scss';

export default function GallerySection({gallery}: GallerySectionProps) {
  if (gallery.length === 0) {
    return (
      <section id="gallery" className="section">
        <div className="container">
          <h2 className="section-title">Галерея</h2>
          <p>Фотографії завантажуються...</p>
        </div>
      </section>
    );
  }

  const slotCounts = gallery.map((_, idx) => {
    const mod = idx % 5;
    if (mod === 0) return 4;
    if (mod === 3 || mod === 4) return 2;
    return 1;
  });
  const totalEstimatedSlots = slotCounts.reduce((a, b) => a + b, 0);
  const GRID_COLUMNS = Math.max(4, Math.ceil(Math.sqrt(totalEstimatedSlots)));
  const matrix: boolean[][] = [];

  const itemsWithLayout = gallery.map((item, index) => {
    const mod = index % 5;
    let prefW = 1;
    let prefH = 1;

    if (mod === 0) {
      prefW = 2;
      prefH = 2;
    }
    if (mod === 3) {
      prefW = 2;
      prefH = 1;
    }
    if (mod === 4) {
      prefW = 1;
      prefH = 2;
    }

    let r = 0;
    let c = 0;
    let found = false;

    while (!found) {
      if (!matrix[r]) matrix[r] = new Array(GRID_COLUMNS)
        .fill(false);
      for (let col = 0; col < GRID_COLUMNS; col++) {
        if (!matrix[r][col]) {
          c = col;
          r = r;
          found = true;
          break;
        }
      }
      if (!found) r++;
    }

    const checkFit = (startR: number, startC: number, w: number, h: number) => {
      if (startC + w > GRID_COLUMNS) return false;
      for (let i = 0; i < h; i++) {
        const rowIdx = startR + i;
        if (!matrix[rowIdx]) matrix[rowIdx] = new Array(GRID_COLUMNS)
          .fill(false);
        for (let j = 0; j < w; j++) {
          if (matrix[rowIdx][startC + j]) return false;
        }
      }
      return true;
    };

    let finalW = prefW;
    let finalH = prefH;

    if (!checkFit(r, c, finalW, finalH)) {
      if (finalW === 2 && finalH === 2) {
        if (checkFit(r, c, 2, 1)) {
          finalW = 2;
          finalH = 1;
        } else if (checkFit(r, c, 1, 2)) {
          finalW = 1;
          finalH = 2;
        } else {
          finalW = 1;
          finalH = 1;
        }
      } else {
        finalW = 1;
        finalH = 1;
      }
    }

    for (let i = 0; i < finalH; i++) {
      const rowIdx = r + i;
      if (!matrix[rowIdx]) matrix[rowIdx] = new Array(GRID_COLUMNS)
        .fill(false);
      for (let j = 0; j < finalW; j++) {
        matrix[rowIdx][c + j] = true;
      }
    }
    return {item, w: finalW, h: finalH, startC: c, startR: r};
  });

  const totalRows = matrix.length || 1;

  if (itemsWithLayout.length > 0) {
    const lastItem = itemsWithLayout[itemsWithLayout.length - 1];
    if (lastItem.startC + lastItem.w < GRID_COLUMNS) {
      lastItem.w = GRID_COLUMNS - lastItem.startC;
    }
  }
  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2 className="section-title">Галерея</h2>
        <div
          className="gallery-grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat(${totalRows}, 1fr)`
          }}>
          {itemsWithLayout.map(({item, w, h}) => (
            <figure
              key={item.id}
              className="gallery-item"
              style={{
                gridColumn: `span ${w}`,
                gridRow: `span ${h}`
              }}>
              <img src={item.imageUrl} alt={item.title} loading="lazy"/>
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}