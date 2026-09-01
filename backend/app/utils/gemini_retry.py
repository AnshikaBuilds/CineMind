import time


def retry_gemini_call(call_function, retries=3):

    for attempt in range(retries):

        try:
            return call_function()

        except Exception as error:

            if "429" not in str(error):
                raise

            if attempt == retries - 1:
                raise

            wait_time = 35 * (attempt + 1)

            print(
                f"Gemini quota reached. "
                f"Retrying in {wait_time} seconds..."
            )

            time.sleep(wait_time)