// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const overviewContent = document.getElementById('overview-content');
  const consumptionContent = document.getElementById('consumption-content');
  const azureP3Content = document.getElementById('azure-p3-content');
  const commitBucketsContent = document.getElementById('commit-buckets-content');
  const billingSettingsContent = document.getElementById('billing-settings-content');
  const billingsContent = document.getElementById('billings-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab contents
      overviewContent.style.display = 'none';
      consumptionContent.style.display = 'none';
      if (azureP3Content) azureP3Content.style.display = 'none';
      commitBucketsContent.style.display = 'none';
      billingSettingsContent.style.display = 'none';
      billingsContent.style.display = 'none';
      
      // Handle tab content visibility
      const tabName = this.getAttribute('data-tab');
      
      if (tabName === 'overview') {
        overviewContent.style.display = 'block';
      } else if (tabName === 'consumption') {
        consumptionContent.style.display = 'block';
      } else if (tabName === 'azure-p3') {
        if (azureP3Content) azureP3Content.style.display = 'block';
      } else if (tabName === 'commit-buckets') {
        commitBucketsContent.style.display = 'block';
      } else if (tabName === 'billing-settings') {
        billingSettingsContent.style.display = 'block';
      } else if (tabName === 'billings') {
        billingsContent.style.display = 'block';
      }
    });
  });
});

// Edit mode toggle for billing schedules
let isEditMode = false;

function toggleEditMode() {
  isEditMode = !isEditMode;
  const billingSection = document.querySelector('.billing-channels-table');
  const editButton = document.querySelector('.section-header .toolbar-btn');
  
  if (isEditMode) {
    billingSection.classList.add('edit-mode');
    editButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Save Changes
    `;
    editButton.classList.add('primary');
    editButton.classList.remove('outline');
    
    // Show tooltip/hint
    showEditHint();
  } else {
    billingSection.classList.remove('edit-mode');
    editButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      </svg>
      Edit Billing Schedule
    `;
    editButton.classList.remove('primary');
    editButton.classList.add('outline');
    
    // Hide hint
    hideEditHint();
  }
}

function showEditHint() {
  // Remove existing hint if any
  hideEditHint();
  
  const hint = document.createElement('div');
  hint.className = 'edit-hint';
  hint.innerHTML = '<strong>Edit Mode:</strong> Click on any installment row to modify the date or amount. Only Prepaid installment schedules can be edited.';
  
  const section = document.querySelector('.billing-channels-table');
  section.parentNode.insertBefore(hint, section);
}

function hideEditHint() {
  const existingHint = document.querySelector('.edit-hint');
  if (existingHint) {
    existingHint.remove();
  }
}

// Collapse All functionality for Billings tab
document.addEventListener('DOMContentLoaded', function() {
  const collapseBtn = document.getElementById('collapseAllBtn');
  if (collapseBtn) {
    let isCollapsed = false;
    collapseBtn.addEventListener('click', function() {
      isCollapsed = !isCollapsed;
      const rows = document.querySelectorAll('.billings-table tbody tr');
      
      if (isCollapsed) {
        this.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
          Expand All
        `;
      } else {
        this.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
          Collapse All
        `;
      }
    });
  }
});

// Toggle Ledger Entries section
function toggleLedger(button) {
  const bucketCard = button.closest('.commit-bucket-card');
  const ledgerSection = bucketCard.querySelector('.ledger-section');
  
  if (ledgerSection) {
    const isVisible = ledgerSection.style.display !== 'none';
    ledgerSection.style.display = isVisible ? 'none' : 'block';
    button.classList.toggle('expanded', !isVisible);
  }
}

// P3 Modal Functions
function openP3Modal() {
  const modal = document.getElementById('p3Modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeP3Modal() {
  const modal = document.getElementById('p3Modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('p3Modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeP3Modal();
      }
    });
  }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeP3Modal();
  }
});
