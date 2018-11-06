numchars=`tr -d '[:space:] ' < submission.txt | wc -c | awk '{print $1}'`;
if [ $numchars -gt 36 ]
then
  echo "Your submission is too long! ($numchars characters)"
  exit 1
fi

python3 befunge.py submission.txt < input.txt > output.txt

if cmp -b output.txt desiredoutput.txt
  then
    echo "Correct answer! Your flag is utflag{who_knew_esoteric_languages_were_concise}"
  else
    echo "Program was incorrect and/or failed to run. Try again :("
  fi
