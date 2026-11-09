import zlib
import struct
import math
import os

def create_png(width, height, get_pixel_func):
    """Generates standard compliant 32-bit RGBA PNG data using standard library zlib and struct."""
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = get_pixel_func(x, y, width, height)
            raw_data.extend([int(r), int(g), int(b), int(a)])

    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff)

    header = b"\x89PNG\r\n\x1a\n"
    ihdr = chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
    idat = chunk(b"IDAT", zlib.compress(bytes(raw_data), 9))
    iend = chunk(b"IEND", b"")

    return header + ihdr + idat + iend

def render_nexus_icon(x, y, w, h, is_maskable=False):
    # Normalize coordinates to 0.0 - 1.0
    nx = x / float(w)
    ny = y / float(h)

    # Base background: Dark navy/slate #0f172a
    bg_r, bg_g, bg_b, bg_a = 15, 23, 42, 255

    # If not maskable, round corners with squircle radius 0.22
    if not is_maskable:
        # Distance from edge corners
        cx = min(nx, 1.0 - nx)
        cy = min(ny, 1.0 - ny)
        radius = 0.22
        if cx < radius and cy < radius:
            dx = radius - cx
            dy = radius - cy
            dist = math.sqrt(dx * dx + dy * dy)
            if dist > radius:
                # Anti-aliasing
                alpha = max(0.0, min(1.0, (radius + 0.005 - dist) / 0.005))
                if alpha <= 0:
                    return 0, 0, 0, 0
                bg_a = int(255 * alpha)

    # Background gradient: slightly lighter toward bottom right
    grad = (nx + ny) * 0.15
    cur_r = min(255, int(bg_r + grad * 20))
    cur_g = min(255, int(bg_g + grad * 15))
    cur_b = min(255, int(bg_b + grad * 50))
    cur_a = bg_a

    # Scale coordinates if maskable to preserve 80% safe zone
    if is_maskable:
        px = (nx - 0.5) / 0.8 + 0.5
        py = (ny - 0.5) / 0.8 + 0.5
    else:
        px = nx
        py = ny

    # Draw 4 ecosystem node dots
    # TL: RosterSync (Indigo #6366f1)
    # TR: TalentPulse (Emerald #10b981)
    # BL: Kopilot (Sky #0ea5e9)
    # BR: BoekhoudGemak (Amber #f59e0b)
    nodes = [
        (0.28, 0.26, 99, 102, 241),   # RosterSync
        (0.72, 0.26, 16, 185, 129),   # TalentPulse
        (0.28, 0.74, 14, 165, 233),   # Kopilot
        (0.72, 0.74, 245, 158, 11),   # BoekhoudGemak
    ]

    for dot_x, dot_y, dr, dg, db in nodes:
        dd = math.sqrt((px - dot_x)**2 + (py - dot_y)**2)
        if dd < 0.038:
            edge = (0.038 - dd) / 0.006
            blend = max(0.0, min(1.0, edge))
            cur_r = int(cur_r * (1 - blend) + dr * blend)
            cur_g = int(cur_g * (1 - blend) + dg * blend)
            cur_b = int(cur_b * (1 - blend) + db * blend)

    # Draw NexusCRM "N" Monogram
    # Vertical Left bar: px in [0.35, 0.43], py in [0.30, 0.70]
    in_left_bar = (0.34 <= px <= 0.42) and (0.29 <= py <= 0.71)
    # Vertical Right bar: px in [0.57, 0.65], py in [0.30, 0.70]
    in_right_bar = (0.58 <= px <= 0.66) and (0.29 <= py <= 0.71)

    # Diagonal bar: from (0.38, 0.30) to (0.62, 0.70)
    # Slope = (0.70 - 0.30) / (0.62 - 0.38) = 0.40 / 0.24 = 1.6667
    expected_py = 0.30 + (px - 0.38) * 1.6667
    in_diagonal = (0.37 <= px <= 0.63) and (abs(py - expected_py) < 0.065) and (0.29 <= py <= 0.71)

    if in_left_bar or in_right_bar or in_diagonal:
        # Indigo / Violet gradient
        nr = 129
        ng = 140
        nb = 248
        if in_diagonal:
            nr = 99
            ng = 102
            nb = 241
        cur_r = nr
        cur_g = ng
        cur_b = nb

    # Central glowing pulse orb at (0.50, 0.50)
    cd = math.sqrt((px - 0.50)**2 + (py - 0.50)**2)
    if cd < 0.032:
        blend = max(0.0, min(1.0, (0.032 - cd) / 0.008))
        cur_r = int(cur_r * (1 - blend) + 255 * blend)
        cur_g = int(cur_g * (1 - blend) + 255 * blend)
        cur_b = int(cur_b * (1 - blend) + 255 * blend)
    elif cd < 0.055:
        halo = max(0.0, min(1.0, (0.055 - cd) / 0.023)) * 0.6
        cur_r = int(cur_r * (1 - halo) + 129 * halo)
        cur_g = int(cur_g * (1 - halo) + 140 * halo)
        cur_b = int(cur_b * (1 - halo) + 248 * halo)

    return cur_r, cur_g, cur_b, cur_a

def main():
    os.makedirs("public", exist_ok=True)
    
    # 1. pwa-192x192.png
    print("Generating pwa-192x192.png...")
    png_192 = create_png(192, 192, lambda x, y, w, h: render_nexus_icon(x, y, w, h, False))
    with open("public/pwa-192x192.png", "wb") as f:
        f.write(png_192)

    # 2. pwa-512x512.png
    print("Generating pwa-512x512.png...")
    png_512 = create_png(512, 512, lambda x, y, w, h: render_nexus_icon(x, y, w, h, False))
    with open("public/pwa-512x512.png", "wb") as f:
        f.write(png_512)

    # 3. pwa-maskable-512x512.png
    print("Generating pwa-maskable-512x512.png...")
    png_maskable = create_png(512, 512, lambda x, y, w, h: render_nexus_icon(x, y, w, h, True))
    with open("public/pwa-maskable-512x512.png", "wb") as f:
        f.write(png_maskable)

    # 4. apple-touch-icon.png (180x180)
    print("Generating apple-touch-icon.png...")
    png_apple = create_png(180, 180, lambda x, y, w, h: render_nexus_icon(x, y, w, h, False))
    with open("public/apple-touch-icon.png", "wb") as f:
        f.write(png_apple)

    # 5. favicon.ico (can be a 48x48 PNG or ICO; modern browsers accept 48x48 PNG format as favicon or ICO)
    print("Generating favicon.ico...")
    png_48 = create_png(48, 48, lambda x, y, w, h: render_nexus_icon(x, y, w, h, False))
    # Standard 16/32/48 ICO header wrapping PNG
    ico_header = struct.pack("<HHH", 0, 1, 1) # reserved, type 1 (icon), 1 image
    ico_entry = struct.pack("<BBBBHHII", 48, 48, 0, 0, 1, 32, len(png_48), 6 + 16)
    with open("public/favicon.ico", "wb") as f:
        f.write(ico_header + ico_entry + png_48)

    print("All PWA icons generated successfully!")

if __name__ == "__main__":
    main()
