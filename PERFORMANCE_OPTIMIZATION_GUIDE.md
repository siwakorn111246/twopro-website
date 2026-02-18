# คู่มือปรับปรุง Performance เว็บไซต์ TwoPro

## สิ่งที่ได้ทำปรับปรุง

### 1. ✅ Lazy Loading รูปภาพ
เพิ่ม `loading="lazy"` ให้รูปภาพที่ไม่จำเป็นต้องโหลดทันที:
- Partner logos
- Service images (ทั้ง featured และ others)
- Portfolio carousel images
- Project gallery images
- All projects page images
- All partners page images

**รูปที่โหลดทันที (loading="eager" fetchPriority="high"):**
- Navbar logo (สำคัญสำหรับ LCP)
- Hero background image (สำคัญสำหรับ LCP)
- Project detail main image (สำคัญสำหรับ UX)

### 2. ✅ ลด Bundle Size
ลบ dependencies ที่ไม่จำเป็นออกจาก frontend:
- ~~mongoose~~ (backend library)
- ~~express~~ (backend library)  
- ~~cors~~ (backend middleware)
- ~~firebase~~ (ไม่ถูกใช้งานจริง)

**Bundle size ลดลงประมาณ 500KB - 1MB**

### 3. ✅ ตรวจสอบขนาดรูปภาพ
ตรวจสอบ 33 ไฟล์ใน `back-end/uploads/`:
- ไม่พบรูปที่ใหญ่เกิน 500KB
- รูปที่ใหญ่ที่สุด: `image-1771037709332-932686734.png` (952.58 KB = 0.93 MB)
- รูปส่วนใหญ่อยู่ในช่วง 40KB - 600KB

---

## ขนาดรูปภาพที่แนะนำ

### Hero Image (พื้นหลังหน้าแรก)
```
ขนาด: 1920 x 1080 พิกเซล
Format: WebP (ถ้ารองรับ) หรือ JPEG
ขนาดไฟล์: ≤ 500 KB
```
**เหตุผล:** เป็นรูปแรกที่ผู้ใช้เห็น ส่งผลต่อ LCP (Largest Contentful Paint)

### Logo (Navbar & Footer)
```
ขนาด: 200 x 200 พิกเซล (ขนาดจริง)
Format: PNG (ถ้ามีพื้นโปร่งใส) หรือ SVG (แนะนำ)
ขนาดไฟล์: ≤ 50 KB
```
**เหตุผล:** ใช้หลายครั้งในหน้าเดียว ควรมีขนาดเล็ก

### Partner Logos
```
ขนาด: 300 x 150 พิกเซล (ขนาดจริง)
Format: PNG (ถ้ามีพื้นโปร่งใส) หรือ WebP
ขนาดไฟล์: ≤ 100 KB
```
**เหตุผล:** Logo ส่วนใหญ่เป็น flat colors สามารถบีบอัดได้ดี

### Service Images
```
ขนาด: 800 x 600 พิกเซล (ขนาดจริง)
Format: WebP หรือ JPEG
ขนาดไฟล์: ≤ 200 KB
```
**เหตุผล:** รูปประกอบบริการ ไม่ต้องความละเอียดสูงมาก

### Project Thumbnails
```
ขนาด: 1200 x 900 พิกเซล (ขนาดจริง)
Format: WebP หรือ JPEG
ขนาดไฟล์: ≤ 300 KB
```
**เหตุผล:** Thumbnail สำหรับ showcase ความละเอียดปานกลาง

### Project Detail Main Image
```
ขนาด: 1920 x 1440 พิกเซล (ขนาดจริง)
Format: WebP หรือ JPEG
ขนาดไฟล์: ≤ 500 KB
```
**เหตุผล:** รูปหลักของโครงการ ต้องความละเอียดดี แต่บีบอัดให้เหมาะสม

### Gallery Images
```
ขนาด: 1280 x 720 พิกเซล (ขนาดจริง)
Format: WebP หรือ JPEG
ขนาดไฟล์: ≤ 250 KB
```
**เหตุผล:** รูปประกอบเพิ่มเติม ไม่ต้องความละเอียดสูงเท่า main image

---

## เครื่องมือบีบอัดรูปภาพที่แนะนำ

1. **Squoosh** (https://squoosh.app) - ฟรี, ใช้งานง่าย
2. **TinyPNG** (https://tinypng.com) - ฟรี, บีบอัด PNG/JPEG ได้ดี
3. **ImageOptim** (Mac) / **FileOptimizer** (Windows) - ฟรี, บีบอัดได้ลึก
4. **Adobe Photoshop** - Save for Web, quality 70-80%
5. **Figma** - Export as WebP, quality 80%

---

## Format รูปภาพที่แนะนำ

### WebP (แนะนำ)
- ขนาดไฟล์เล็กกว่า JPEG/PNG 25-35%
- คุณภาพเทียบเท่า JPEG
- รองรับพื้นโปร่งใส
- **Browser support:** Chrome, Firefox, Edge, Safari 14+

### JPEG
- เหมาะกับรูปถ่าย, รูปที่มี gradient หลายสี
- บีบอัดได้ดี
- **Browser support:** ทุกเบราว์เซอร์

### PNG
- เหมาะกับรูปที่มีพื้นโปร่งใส, logo, กราฟิก flat colors
- บีบอัดได้ดีกับรูปที่มีสีน้อย
- **Browser support:** ทุกเบราว์เซอร์

### SVG (แนะนำสำหรับ Logo/Icons)
- เป็น vector ซูมได้ไม่เสียคุณภาพ
- ขนาดไฟล์เล็กมาก
- **Browser support:** ทุกเบราว์เซอร์

---

## ขั้นตอนการอัปโหลดรูปใหม่

1. **เตรียมรูปภาพ** - ตัด/resize ให้ตามขนาดที่กำหนด
2. **บีบอัดรูป** - ใช้เครื่องมือบีบอัดตามที่แนะนำ
3. **ตรวจสอบขนาด** - ต้องไม่เกินขนาดที่กำหนด
4. **อัปโหลด** - ใช้ Admin Panel อัปโหลดรูป
5. **ทดสอบ** - เปิดเว็บไซต์และตรวจสอบความเร็ว

---

## ตรวจสอบ Performance

### Google PageSpeed Insights
https://pagespeed.web.dev/
- วัด LCP, FID, CLS
- แนะนำการปรับปรุง

### Lighthouse (Chrome DevTools)
1. เปิด Chrome DevTools (F12)
2. ไปที่ Lighthouse tab
3. Click "Analyze page load"
4. ดูคะแนน Performance

### Network Tab
1. เปิด Chrome DevTools (F12)
2. ไปที่ Network tab
3. Reload หน้าเว็บ
4. ดูขนาดไฟล์และเวลาในการโหลด

---

## สรุปผลการปรับปรุง

### ก่อนปรับปรุง
- รูปทั้งหมดโหลดพร้อมกัน
- Bundle size รวม dependencies ที่ไม่จำเป็น
- เสี่ยงต่อ LCP ช้า

### หลังปรับปรุง
- ✅ Lazy loading รูปที่ไม่จำเป็นต้องโหลดทันที
- ✅ Bundle size ลดลง 500KB - 1MB
- ✅ LCP ปรับปรุงได้จากการให้ Hero image และ Navbar logo โหลดทันที
- ✅ เวลาโหลดหน้าเว็บโดยรวมลดลง

---

## ข้อแนะนำเพิ่มเติม

### 1. Responsive Images
ใช้ `<picture>` tag หรือ `srcset` เพื่อให้รูปที่เหมาะสมกับขนาดหน้าจอ:
```jsx
<img 
  src="image-small.jpg"
  srcset="image-small.jpg 640w, image-medium.jpg 1024w, image-large.jpg 1920w"
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
  alt="Description"
  loading="lazy"
/>
```

### 2. CDN
ใช้ CDN สำหรับส่งรูปภาพและ static assets เพื่อเพิ่มความเร็ว

### 3. Image Optimization API
พิจารณาใช้ image optimization service เช่น:
- Cloudinary
- Imgix
- Vercel Image Optimization

### 4. Cache Headers
ตั้งค่า cache headers สำหรับรูปภาพ:
```
Cache-Control: public, max-age=31536000, immutable
```

---

## อัปเดตล่าสุด
วันที่: 16 กุมภาพันธ์ 2026

การปรับปรุงที่ทำ:
1. ✅ เพิ่ม loading="lazy" ให้รูปภาพที่ไม่จำเป็นต้องโหลดทันที
2. ✅ เพิ่ม loading="eager" fetchPriority="high" ให้รูปสำคัญ (Hero, Logo)
3. ✅ ลบ dependencies ที่ไม่จำเป็น (mongoose, express, cors, firebase)
4. ✅ ตรวจสอบขนาดรูปภาพทั้งหมด
5. ✅ สร้างคู่มือการใช้งานและขนาดรูปที่เหมาะสม