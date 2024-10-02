// Global variables
let uploadCount = 1;
let photoUploadCount = 1;

// Utility functions
function handleFileSelect(event, imgElement) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const imageURL = URL.createObjectURL(file);
    imgElement.src = imageURL;
    imgElement.style.display = "block";
    imgElement.onload = function () {
      URL.revokeObjectURL(imgElement.src);
    };
  } else {
    alert("Please select a valid image file.");
  }
}
// Helper function to load image as Data URL
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous"); // To avoid CORS issues
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });
}

// Product Pictures functions
function addNewUpload() {
  uploadCount++;
  const container = document.getElementById("imageUploadContainer");

  const newCardContainer = document.createElement("div");
  newCardContainer.classList.add("card-container");

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.width = "200px";
  newCard.style.height = "200px";
  newCard.style.border = "1px solid #ccc";
  newCard.style.cursor = "pointer";

  const newImg = document.createElement("img");
  newImg.id = `image${uploadCount}`;
  newImg.alt = `Preview Image ${uploadCount}`;
  newImg.style.width = "100%";
  newImg.style.height = "100%";
  newImg.style.objectFit = "cover";
  newImg.style.display = "none";

  const newInput = document.createElement("input");
  newInput.type = "file";
  newInput.accept = "image/*";
  newInput.id = `input-file${uploadCount}`;
  newInput.style.display = "none";

  newCard.addEventListener("click", function () {
    newInput.click();
  });

  newCard.appendChild(newImg);
  newCard.appendChild(newInput);

  const newCommentBox = document.createElement("textarea");
  newCommentBox.id = `comment${uploadCount}`;
  newCommentBox.placeholder = "Add a note...";
  newCommentBox.style.width = "200px";
  newCommentBox.style.height = "50px";
  newCommentBox.style.marginTop = "10px";

  newCardContainer.appendChild(newCard);
  newCardContainer.appendChild(newCommentBox);

  container.appendChild(newCardContainer);

  newInput.addEventListener("change", function (event) {
    handleFileSelect(event, newImg);
  });
}

function uploadImages() {
  // Implement image upload functionality here
  console.log("Uploading images...");
}

// Defect Pictures functions
function addNewPhotoUpload() {
  photoUploadCount++;
  const container = document.getElementById("photoUploadContainer");

  const newCardContainer = document.createElement("div");
  newCardContainer.classList.add("card-container");

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.width = "200px";
  newCard.style.height = "200px";
  newCard.style.border = "1px solid #ccc";
  newCard.style.cursor = "pointer";

  const newImg = document.createElement("img");
  newImg.id = `photo${photoUploadCount}`;
  newImg.alt = `Preview Photo ${photoUploadCount}`;
  newImg.style.width = "100%";
  newImg.style.height = "100%";
  newImg.style.objectFit = "cover";
  newImg.style.display = "none";

  const newInput = document.createElement("input");
  newInput.type = "file";
  newInput.accept = "image/*";
  newInput.id = `input-photo${photoUploadCount}`;
  newInput.style.display = "none";

  newCard.addEventListener("click", function () {
    newInput.click();
  });

  newCard.appendChild(newImg);
  newCard.appendChild(newInput);

  const newCommentBox = document.createElement("textarea");
  newCommentBox.id = `photoComment${photoUploadCount}`;
  newCommentBox.placeholder = "Add a note...";
  newCommentBox.style.width = "200px";
  newCommentBox.style.height = "50px";
  newCommentBox.style.marginTop = "10px";

  newCardContainer.appendChild(newCard);
  newCardContainer.appendChild(newCommentBox);

  container.appendChild(newCardContainer);

  newInput.addEventListener("change", function (event) {
    handleFileSelect(event, newImg);
  });
}

function uploadPhotos() {
  // Implement photo upload functionality here
  console.log("Uploading photos...");
}

// PDF Generation
// PDF Generation
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Define colors
  const primaryColor = [0, 123, 255]; // Blue
  const secondaryColor = [108, 117, 125]; // Gray

  function addSectionTitle(title) {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(title, margin, y);
    y += 10;
    
    // Add an underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
  }

  function checkPageBreak(contentHeight) {
    if (y + contentHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      addPageHeader();
      return true;
    }
    return false;
  }

  function addPageHeader() {
    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    doc.text("VCRA PRODUCT INSPECTION REPORT", pageWidth - margin, 10, { align: "right" });
    doc.line(margin, 15, pageWidth - margin, 15);
    y = 25;
  }

  async function addTable(headers, rows) {
    return new Promise((resolve) => {
      if (!Array.isArray(rows) || rows.length === 0) {
        console.warn("No rows data provided for table. Headers:", headers);
        resolve();
        return;
      }

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: y,
        theme: "grid",
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: y, bottom: margin },
        didDrawPage: function (data) {
          addPageHeader();
        },
      });
      y = doc.lastAutoTable.finalY + 10;
      resolve();
    });
  }

  async function addImages(containerSelector, title) {
    // Always start a new page for image sections
    doc.addPage();
    y = margin;
    addPageHeader();

    addSectionTitle(title);
    const container = document.querySelector(containerSelector);
    const images = container.querySelectorAll('img');
    const comments = container.querySelectorAll('textarea');
    
    const maxWidth = (pageWidth - 5 * margin) / 2; // Width for each image (2 per row)
    const maxHeight = 80; // Maximum height for images
    
    for (let i = 0; i < images.length; i += 2) {
      if (checkPageBreak(maxHeight + 40)) {
        y += 10; // Add some space at the top of the new page
      }
      
      for (let j = 0; j < 2; j++) {
        if (i + j < images.length && images[i + j].src) {
          try {
            const img = images[i + j];
            const imgData = await getBase64Image(img);
            
            // Calculate dimensions to maintain aspect ratio
            let imgWidth = img.naturalWidth;
            let imgHeight = img.naturalHeight;
            const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
            imgWidth *= ratio;
            imgHeight *= ratio;
            
            const xOffset = j * (maxWidth + margin);
            doc.addImage(imgData, 'JPEG', margin + xOffset, y, imgWidth, imgHeight);
            
            // Add comment below the image
            const comment = comments[i + j].value;
            doc.setFontSize(8);
            doc.setTextColor(...secondaryColor);
            doc.text(comment, margin + xOffset, y + imgHeight + 5, { 
              maxWidth: maxWidth,
              align: 'left'
            });
          } catch (error) {
            console.error('Error adding image to PDF:', error);
          }
        }
      }
      
      y += maxHeight + 30; // Move to next row
    }
    
    y += 10; // Add some space after the images section
  }

  function getBase64Image(img) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }, 'image/jpeg');
    });
  }

  function collectFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const formRows = [];
    formData.forEach((value, key) => {
      const label = form.querySelector(`label[for="${key}"]`)?.innerText || key;
      formRows.push([label, value]);
    });
    return formRows;
  }

  function collectTableData(tableSelector, skipHeader = true) {
    const table = document.querySelector(tableSelector);
    const tableRows = [];
    if (table) {
      const rows = table.getElementsByTagName("tr");
      for (let i = skipHeader ? 1 : 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const rowData = [];
        for (let j = 0; j < cells.length; j++) {
          const input = cells[j].querySelector("input");
          rowData.push(input ? input.value || "" : cells[j].innerText.trim());
        }
        tableRows.push(rowData);
      }
    } else {
      console.error(`Table element "${tableSelector}" not found.`);
    }
    return tableRows;
  }

  function collectRadioData(containerSelector) {
    const container = document.querySelector(containerSelector);
    const rows = [];
    if (container) {
      container.querySelectorAll("tr").forEach((row) => {
        const description = row.querySelector("td")?.textContent.trim();
        const confirm = row.querySelector('input[value="confirm"]')?.checked
          ? "X"
          : "";
        const notConfirm = row.querySelector('input[value="notConfirm"]')
          ?.checked
          ? "X"
          : "";
        const na = row.querySelector('input[value="na"]')?.checked ? "X" : "";
        const comments = row.querySelector('input[type="text"]')?.value || "";
        rows.push([description, confirm, notConfirm, na, comments]);
      });
    }
    return rows;
  }

  async function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  try {
    // Add cover page
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("VCRA PRODUCT", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });
    doc.text("INSPECTION REPORT", pageWidth / 2, pageHeight / 2 + 10, { align: "center" });
    doc.setFontSize(12);
    doc.text(new Date().toLocaleDateString(), pageWidth / 2, pageHeight - 30, { align: "center" });

    // Add logo
    const logoURL = "assets/img/logo.png";
    const logoImg = await loadImage(logoURL);
    const logoWidth = 60;
    const logoHeight = 30;
    doc.addImage(
      logoImg,
      "PNG",
      pageWidth / 2 - logoWidth / 2,
      pageHeight / 2 - 80,
      logoWidth,
      logoHeight
    );

    // Start content on new page
    doc.addPage();
    addPageHeader();

    // Function to add a section with title and table
    async function addSection(title, headers, rows) {
      const contentHeight = (rows.length + 1) * 10 + 40; // Estimate height
      if (checkPageBreak(contentHeight)) {
        y += 10; // Add some space at the top of the new page
      }
      addSectionTitle(title);
      await addTable(headers, rows);
    }

    // Add sections
    await addSection("Inspection Form Details", ["Label", "Value"], collectFormData("inspectionForm"));
    await addSection("Production Order Number", ["Production Order Number", "Color", "Quantity"], collectTableData("#dynamicTable1"));
    await addSection("AQL and Sample Size", ["Label", "Value"], collectFormData("thirdform"));
    
    // Product Pictures always start on a new page
    await addImages("#imageUploadContainer", "Product Pictures");
    
    await addSection("Product Details Verification", ["Description", "Confirm", "Not Confirm", "N/A"], collectRadioData(".product-details-verification table"));
    await addSection("Measurement Verification Sheet", ["Point of Measure", "Size", "Tolerance", "Spec", "", "", ""], collectTableData("#dynamicTable"));
    await addSection("Quality Check List On Material & Workmanship", ["Material & Workmanship Details", "Critical", "Major", "Minor"], collectTableData("#dynamicTable2"));
    await addSection("Appearance and Packing", ["Description", "Confirm", "Not Confirm", "N/A", "Comments"], collectRadioData("#form1111"));
    await addSection("Material", ["Description", "Confirm", "Not Confirm", "N/A", "Comments"], collectRadioData("#formmaterial"));
    await addSection("Accessories & Trims", ["Description", "Confirm", "Not Confirm", "N/A", "Comments"], collectRadioData("#accessories-trims-form"));
    
    // Defect Pictures always start on a new page
    await addImages("#photoUploadContainer", "Defect Pictures");

    // Inspection Result
    const inspectionResult = document.querySelector('.button-group input[type="radio"]:checked');
    const resultText = inspectionResult ? inspectionResult.parentElement.textContent.trim() : "No option selected";
    await addSection("Inspection Result", ["Inspection Result"], [[resultText]]);

    // Save the PDF
    doc.save("VCRA-Product-Inspection-Report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please check the console for details.");
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  const inputFile1 = document.getElementById("input-file1");
  const image1 = document.getElementById("image1");

  inputFile1.addEventListener("change", function (event) {
    handleFileSelect(event, image1);
  });

  const inputPhoto1 = document.getElementById("input-photo1");
  const photo1 = document.getElementById("photo1");

  inputPhoto1.addEventListener("change", function (event) {
    handleFileSelect(event, photo1);
  });
});
