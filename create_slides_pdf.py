#!/usr/bin/env python3
"""
Combine scooter slide images into a single PDF file.
"""

from PIL import Image
import os
from pathlib import Path

def create_pdf_from_images():
    """Combine scooter slide images into a PDF"""
    images_dir = Path("images/projects")
    output_pdf = images_dir / "scooter-slides.pdf"
    
    # Get all scooter slide images
    slide_images = sorted(images_dir.glob("scooter-slide-*.png"))
    
    if not slide_images:
        print("No scooter slide images found!")
        return False
    
    print(f"Found {len(slide_images)} slide images")
    
    # Open all images
    image_list = []
    for img_path in slide_images:
        try:
            img = Image.open(img_path)
            # Convert to RGB if necessary (PDF requires RGB)
            if img.mode != 'RGB':
                img = img.convert('RGB')
            image_list.append(img)
            print(f"  Added: {img_path.name}")
        except Exception as e:
            print(f"  Error opening {img_path.name}: {e}")
    
    if not image_list:
        print("No valid images to combine!")
        return False
    
    # Save as PDF
    try:
        image_list[0].save(
            output_pdf,
            "PDF",
            resolution=150.0,
            save_all=True,
            append_images=image_list[1:]
        )
        print(f"\n✓ PDF created: {output_pdf}")
        print(f"  Size: {output_pdf.stat().st_size / 1024:.1f} KB")
        return True
    except Exception as e:
        print(f"Error creating PDF: {e}")
        return False

if __name__ == "__main__":
    create_pdf_from_images()

