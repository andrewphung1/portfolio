#!/usr/bin/env python3
"""
Convert PDF pages to images for the Scooter Cup Clamp Holder project gallery.
Usage: python3 convert_pdf.py <path-to-pdf-file>
"""

import sys
import os
from pathlib import Path

def convert_pdf_with_sips(pdf_path, output_dir, prefix="scooter-slide"):
    """Convert PDF to images using macOS sips (only extracts first page)"""
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # sips can only extract first page, so we'll do that
    output_file = output_dir / f"{prefix}-1.png"
    os.system(f'sips -s format png "{pdf_path}" --out "{output_file}" > /dev/null 2>&1')
    
    if output_file.exists():
        print(f"✓ Extracted first page to {output_file}")
        print("Note: For all pages, install poppler-utils: brew install poppler")
        return True
    return False

def convert_pdf_with_pdf2image(pdf_path, output_dir, prefix="scooter-slide", dpi=150):
    """Convert PDF to images using pdf2image library"""
    try:
        from pdf2image import convert_from_path
    except ImportError:
        print("pdf2image not installed. Install with: pip3 install pdf2image")
        print("Also install poppler: brew install poppler")
        return False
    
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    try:
        images = convert_from_path(pdf_path, dpi=dpi)
        for i, image in enumerate(images, start=1):
            output_file = output_dir / f"{prefix}-{i}.png"
            image.save(output_file, 'PNG')
            print(f"✓ Converted page {i} to {output_file}")
        return True
    except Exception as e:
        print(f"Error converting PDF: {e}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 convert_pdf.py <path-to-pdf-file>")
        print("\nExample:")
        print("  python3 convert_pdf.py ~/Downloads/image16\ \(1\).pdf")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    output_dir = "images/projects"
    prefix = "scooter-slide"
    
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found: {pdf_path}")
        sys.exit(1)
    
    print(f"Converting {pdf_path}...")
    print(f"Output directory: {output_dir}/")
    print()
    
    # Try pdf2image first (better quality, all pages)
    if convert_pdf_with_pdf2image(pdf_path, output_dir, prefix):
        print("\n✓ Conversion complete!")
        return
    
    # Fallback to sips (only first page)
    print("Falling back to sips (will only extract first page)...")
    if convert_pdf_with_sips(pdf_path, output_dir, prefix):
        print("\n✓ First page extracted!")
        print("To convert all pages, install:")
        print("  pip3 install pdf2image")
        print("  brew install poppler")
    else:
        print("\n✗ Conversion failed")

if __name__ == "__main__":
    main()

