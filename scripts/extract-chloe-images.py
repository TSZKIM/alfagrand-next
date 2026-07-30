"""Extract product images from CHLOE PUMP CATALOGUE PDF - temp dir version"""
from pypdf import PdfReader
import os, shutil

reader = PdfReader(r"D:\catalog\方霄泵业\CHLOE PUMP CATALOGUE .pdf")
out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images", "chloe")
out_dir = os.path.normpath(out_dir)
os.makedirs(out_dir, exist_ok=True)
print(f"Output: {out_dir}")

count = 0
for i, page in enumerate(reader.pages):
    resources = page.get("/Resources", {})
    xobject = resources.get("/XObject", {})
    if xobject:
        for key in xobject:
            obj = xobject[key]
            subtype = obj.get("/Subtype", "")
            if subtype == "/Image":
                w = obj.get("/Width", 0) or 0
                h = obj.get("/Height", 0) or 0
                if w > 150 and h > 150:
                    try:
                        data = obj.get_data()
                        filt = obj.get("/Filter", "")
                        if isinstance(filt, list):
                            filt = str(filt[0]) if filt else ""
                        else:
                            filt = str(filt)
                        if "DCTDecode" in filt or "JPXDecode" in filt:
                            ext = ".jpg"
                        else:
                            ext = ".png"
                        fname = os.path.join(out_dir, f"p{i+1:02d}_{key}_{int(w)}x{int(h)}{ext}")
                        with open(fname, "wb") as f:
                            f.write(data)
                        count += 1
                    except Exception as e:
                        print(f"Error on page {i+1}, {key}: {e}")

print(f"Extracted {count} images")
