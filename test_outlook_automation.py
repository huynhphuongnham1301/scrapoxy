#!/usr/bin/env python3
"""
Test script for Outlook Signup Automation
This is a headless test version that verifies the script logic without requiring a display.
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options


def test_outlook_signup():
    """
    Test function to verify the automation script works correctly.
    """
    # Set up Chrome options for headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    
    # Initialize the Chrome driver with options
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # Step 1: Navigate to Outlook signup page
        print("✓ Test 1: Navigating to https://signup.live.com/...")
        driver.get("https://signup.live.com/")
        print(f"  Current URL: {driver.current_url}")
        print(f"  Page title: {driver.title}")
        
        # Step 2: Wait for page to load and look for email textbox
        print("\n✓ Test 2: Waiting for email textbox to appear...")
        
        # Try multiple possible selectors for the email field
        # Using shorter wait time per selector for efficiency
        selectors = [
            (By.ID, "liveSwitch"),
            (By.NAME, "MemberName"),
            (By.CSS_SELECTOR, "input[type='email']"),
            (By.CSS_SELECTOR, "input[name='MemberName']"),
            (By.XPATH, "//input[@type='email']"),
        ]
        
        email_field = None
        for by_method, selector in selectors:
            try:
                # Use a shorter wait time (3 seconds) per selector
                wait = WebDriverWait(driver, 3)
                email_field = wait.until(
                    EC.presence_of_element_located((by_method, selector))
                )
                print(f"  ✓ Found email field using {by_method}: {selector}")
                break
            except TimeoutException:
                print(f"  ✗ Could not find element with {by_method}: {selector}")
                continue
        
        if email_field is None:
            print("\n✗ Test FAILED: Could not find email textbox")
            return False
        
        # Step 3: Enter email address
        print("\n✓ Test 3: Entering email address...")
        email_field.clear()
        email_field.send_keys("random@outlook.com")
        
        # Verify the value was entered
        entered_value = email_field.get_attribute("value")
        if entered_value == "random@outlook.com":
            print(f"  ✓ Email entered successfully: {entered_value}")
        else:
            print(f"  ✗ Email not entered correctly. Expected: random@outlook.com, Got: {entered_value}")
            return False
        
        print("\n✓ All tests PASSED!")
        return True
        
    except Exception as e:
        print(f"\n✗ Test FAILED with error: {str(e)}")
        return False
        
    finally:
        # Close the browser
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    success = test_outlook_signup()
    exit(0 if success else 1)
