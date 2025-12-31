#!/usr/bin/env python3
"""
Outlook Signup Automation Script
This script automates the process of navigating to Outlook signup page
and entering an email address.
"""

import argparse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


def main(keep_open=True):
    """
    Main function to automate Outlook signup process.
    Steps:
    1. Navigate to https://signup.live.com/
    2. Wait for email textbox to appear
    3. Enter random@outlook.com in the email field
    
    Args:
        keep_open (bool): Whether to keep the browser open after completion
    """
    # Initialize the Chrome driver
    driver = webdriver.Chrome()
    
    try:
        # Step 1: Navigate to Outlook signup page
        print("Navigating to https://signup.live.com/...")
        driver.get("https://signup.live.com/")
        
        # Step 2: Wait for email textbox to appear
        # Common selectors for the email input field on signup.live.com
        print("Waiting for email textbox to appear...")
        
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
                print(f"Found email field using {by_method}: {selector}")
                break
            except TimeoutException:
                continue
        
        if email_field is None:
            raise Exception("Could not find email textbox")
        
        # Step 3: Enter random@outlook.com in the email field
        print("Entering email address: random@outlook.com")
        email_field.clear()
        email_field.send_keys("random@outlook.com")
        
        print("Email entered successfully!")
        
        if keep_open:
            print("Keeping browser open for verification. Press Ctrl+C to close...")
            # Keep the browser open for manual verification
            input("Press Enter to close the browser...")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        
    finally:
        # Close the browser
        print("Closing browser...")
        driver.quit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Automate Outlook signup page email entry"
    )
    parser.add_argument(
        "--no-wait",
        action="store_true",
        help="Don't wait for user input before closing browser"
    )
    args = parser.parse_args()
    
    main(keep_open=not args.no_wait)
