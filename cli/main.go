package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"

	"github.com/enigmampc/btcutil/bech32"
)

func main() {
	var from string
	var to string
	flag.StringVar(&from, "from", "enigma", "from prefix")
	flag.StringVar(&to, "to", "secret", "to prefix")
	flag.Parse()

	fi, _ := os.Stdin.Stat()

	if (fi.Mode() & os.ModeCharDevice) != 0 {
		log.Fatalln("Cannot read data from stdin.")
	}

	bech32Regex := regexp.MustCompile(fmt.Sprintf(`%s(pub|valoper|valoperpub|valcons|valconspub)?1[02-9ac-hj-np-z]{6,}\b`, from))

	scanner := bufio.NewScanner(os.Stdin)
	buf := make([]byte, 64*1024)      // 64KiB initial size
	scanner.Buffer(buf, 20*1024*1024) // 20MiB max line size

	for scanner.Scan() {
		line := scanner.Text()
		oldAddressInLine := bech32Regex.FindAllString(line, -1)

		for _, oldAddress := range oldAddressInLine {
			prefix, canonical, err := bech32.Decode(oldAddress, 1023)
			if err != nil {
				log.Printf(`Error parsing "%v" as bech32 address: %v`, oldAddress, err)
				continue
			}

			newPrefix := strings.ReplaceAll(prefix, from, to)
			newAddress, err := bech32.Encode(newPrefix, canonical)
			if err != nil {
				log.Printf(`Error converting "%v" to "%v" prefix: %v`, oldAddress, to, err)
				continue
			}

			line = strings.ReplaceAll(line, oldAddress, newAddress)
		}

		fmt.Println(line)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
