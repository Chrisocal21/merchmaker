# Merch Mockup Studio - Checklist & Ideas

## ✅ Completed Features
- [x] Next.js 14 + TypeScript + Tailwind CSS setup
- [x] Canvas-based mockup rendering
- [x] File upload (SVG/PNG/JPEG)
- [x] Multiple templates (T-shirt & Hoodie, Front Chest & Full Back)
- [x] Design scaling (10-100% slider)
- [x] Drag-and-drop design repositioning
- [x] Reset position button
- [x] Red dotted grid showing print area boundaries
- [x] PNG download functionality
- [x] Real mockup images integration
- [x] Precise print area coordinate positioning

## 🔮 Future Enhancements

### High Priority
- [ ] **Overlay System**: Create PNG overlay files for hoodie laces/details
  - [ ] Extract laces/shadows from hoodie_front.jpg → `hoodie_front_overlay.png`
  - [ ] Extract laces/shadows from hoodie_back.jpg → `hoodie_back_overlay.png`
  - [ ] Enable overlay blending in config (uncomment `overlaySrc` lines)

### Medium Priority
- [ ] Add more product templates (long sleeve, crewneck, etc.)
- [ ] Color picker for mockup background
- [ ] Multiple design upload (layer multiple graphics)
- [ ] Rotation control for designs
- [ ] Design library/recent uploads

### Low Priority
- [ ] Template Editor Mode (visual print area adjustment tool)
- [ ] Export settings (different resolutions, formats)
- [ ] Keyboard shortcuts (arrow keys for fine positioning)
- [ ] Undo/redo functionality
- [ ] Save/load projects

## 📝 Notes
- Overlay PNGs need transparent backgrounds with just the fabric details
- Use Photoshop, GIMP, or Photopea to create proper overlays
- Current mockup coordinates are locked and production-ready
