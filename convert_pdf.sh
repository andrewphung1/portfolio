#!/bin/bash

# Script to convert PDF pages to images
# Usage: ./convert_pdf.sh path/to/file.pdf

if [ -z "$1" ]; then
    echo "Usage: ./convert_pdf.sh <path-to-pdf-file>"
    exit 1
fi

PDF_FILE="$1"
OUTPUT_DIR="images/projects"
OUTPUT_PREFIX="scooter-slide"

# Check if PDF exists
if [ ! -f "$PDF_FILE" ]; then
    echo "Error: PDF file not found: $PDF_FILE"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if we have pdftoppm (poppler-utils) or use sips (macOS)
if command -v pdftoppm &> /dev/null; then
    echo "Converting PDF using pdftoppm..."
    pdftoppm -png -r 150 "$PDF_FILE" "$OUTPUT_DIR/$OUTPUT_PREFIX"
    echo "Conversion complete! Images saved to $OUTPUT_DIR/"
elif command -v sips &> /dev/null; then
    echo "Converting PDF using sips (macOS)..."
    # sips can extract first page, but for multiple pages we need a different approach
    # Let's try using Python with pdf2image if available, or use sips for first page
    PAGE_COUNT=$(mdls -name kMDItemNumberOfPages "$PDF_FILE" 2>/dev/null | grep -o '[0-9]*' | head -1)
    
    if [ -z "$PAGE_COUNT" ]; then
        echo "Could not determine page count. Extracting first page only..."
        sips -s format png "$PDF_FILE" --out "$OUTPUT_DIR/${OUTPUT_PREFIX}-1.png" 2>/dev/null
        echo "First page extracted. For full conversion, install poppler-utils: brew install poppler"
    else
        echo "PDF has $PAGE_COUNT pages. Using sips to extract pages..."
        for i in $(seq 1 $PAGE_COUNT); do
            # Note: sips on macOS can only extract the first page directly
            # For multiple pages, we'd need pdf2image or pdftoppm
            if [ $i -eq 1 ]; then
                sips -s format png "$PDF_FILE" --out "$OUTPUT_DIR/${OUTPUT_PREFIX}-$i.png" 2>/dev/null
            fi
        done
        echo "Note: sips can only extract the first page. For all pages, install poppler: brew install poppler"
    fi
else
    echo "Error: No PDF conversion tool found."
    echo "Install poppler-utils: brew install poppler"
    exit 1
fi

