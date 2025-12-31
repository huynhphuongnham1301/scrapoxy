# Outlook Signup Automation

This Python script automates the process of navigating to the Outlook signup page and entering an email address using Selenium WebDriver.

## Requirements

- Python 3.6 or higher
- Chrome browser installed
- ChromeDriver (compatible with your Chrome version)

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install ChromeDriver:
   - **Option 1**: Install via package manager
     - Ubuntu/Debian: `sudo apt-get install chromium-chromedriver`
     - macOS: `brew install chromedriver`
   
   - **Option 2**: Download manually
     - Visit https://chromedriver.chromium.org/
     - Download the version matching your Chrome browser
     - Add the executable to your system PATH

## Usage

Run the script:
```bash
python outlook_signup_automation.py
```

Or make it executable and run directly:
```bash
chmod +x outlook_signup_automation.py
./outlook_signup_automation.py
```

## What the script does

1. Opens a Chrome browser window
2. Navigates to https://signup.live.com/
3. Waits for the email textbox to appear (max 10 seconds)
4. Enters "random@outlook.com" in the email field
5. Keeps the browser open for manual verification

Press Enter in the terminal to close the browser when done.

## Customization

To enter a different email address, modify the email address in the script:
```python
email_field.send_keys("your-email@outlook.com")
```

## Troubleshooting

### ChromeDriver not found
Make sure ChromeDriver is installed and added to your system PATH.

### Element not found
The script tries multiple selectors to find the email field. If it still fails, the page structure may have changed. You can update the selectors in the script.

### Browser version mismatch
Ensure your ChromeDriver version matches your Chrome browser version.

## Using with other browsers

To use Firefox instead of Chrome:
```python
# Replace
driver = webdriver.Chrome()

# With
driver = webdriver.Firefox()
```

Make sure to install geckodriver for Firefox.
